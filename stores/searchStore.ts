import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { http } from '~/services/http';
import type { DirectusTranslation } from '~/types';

type ExtendedDirectusTranslation = DirectusTranslation & {
  updatedAt?: string | Date;
  createdAt?: string | Date;
};

const debounced = (() => {
  let timeout: ReturnType<typeof setTimeout>;
  const debouceDelay = 1000;

  return (callback: () => void) => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, debouceDelay);
  };
})();

// This is a mapping of language codes to their respective locales.
// Defining it as a const rather than enum for better performance.
const LOCALES = {
  'en': 'en-GB',
  'fr': 'fr-FR',
  'nl': 'nl-NL',
} as const;

const TIMES = {
  'start': '00:00:01.000',
  'end': '23:59:59.999',
} as const;

export const useSearchStore = defineStore('search', () => {
  const results = ref<ExtendedDirectusTranslation[]>([]);
  const dateFilter = ref({
    start: '',
    end: '',
  });
  const currentPage = ref(0);

  const resultsPerPage = ref<number | null>(null);

  async function apiSearch(target: string) {
    // Use debounce function to avoid hammering the backend with too many requests.
    debounced(async () => {
      // Call the Nuxt server API route instead of the external backend directly to avoid CORS issues initially encountered when coding this assessment.
      const response: { data: DirectusTranslation[] } = await http(`/api/search?target=${encodeURIComponent(target)}`);
      results.value = response.data || [];
    });
  }

  async function setPaginationSize(size: number) {
    resultsPerPage.value = size;
  }

  function updateDateFilter(prop: keyof typeof dateFilter.value, value: string) {
    const dateArray = value.split('-').reverse();

    if (dateArray.length === 3 && dateArray[0].length === 4) {
      dateFilter.value[prop] = `${dateArray.join('-')}T${TIMES[prop]}Z`;
    } else {
      if (dateFilter.value[prop] === '') return;
      dateFilter.value[prop] = '';
    }    
  }

  function updateCurrentPage(increment: number) {
    const newPage = currentPage.value + increment;
    if (newPage > 0 && newPage <= totalPages.value) {
      currentPage.value = newPage;
    }
  }

  const searchResults = computed(() => results.value.reduce((output: ExtendedDirectusTranslation[], item: ExtendedDirectusTranslation) => {
    if (!item.updatedAt) {
      item.updatedAt = item.createdAt;
    }

    if (dateFilter.value.start && new Date(dateFilter.value.start) >= new Date(item.updatedAt || '')) {
      return output;
    }

    if (dateFilter.value.end && new Date(dateFilter.value.end) <= new Date(item.updatedAt || '')) {
      return output;
    }

    if (!item.key.includes(':')) {
      output.push(item);
    } else if (item.key.includes(':')) {
      const keyArray = item.key.split(':');
      const languageCode = keyArray.at(-1) as keyof typeof LOCALES;
      item.translations.forEach(translation => {
        translation.languages_code = LOCALES[languageCode];
      });
      const duplicateKey = output[output.length - 1].translations.find(translation => translation.id === item.translations[0].id);
      !duplicateKey && output[output.length - 1].translations.push(...item.translations);
    }
    return output;
  }, []));

  const paginatedResults = computed(() => {
    currentPage.value = 1;
    if (!resultsPerPage.value || !searchResults.value.length) return [[]];

    const result = [];
    for (let i = 0; i < searchResults.value.length; i += resultsPerPage.value) {
      result.push(searchResults.value.slice(i, i + resultsPerPage.value));
    }
    
    return result;
  });

  const currentPageResults = computed(() => {
    if (!paginatedResults.value?.[0]?.[0]) return [];
    return paginatedResults.value[currentPage.value - 1] || [];
  });

  const totalPages = computed(() => {
    return paginatedResults.value.length;
  });

  return { apiSearch, updateDateFilter, searchResults, setPaginationSize, updateCurrentPage, paginatedResults, currentPageResults, currentPage, totalPages, };
});