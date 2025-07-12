import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { http } from '~/services/http';
import type { DirectusTranslation } from '~/types';

type ExtendedDirectusTranslation = DirectusTranslation & {
  updatedAt?: string;
  createdAt?: string;
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

export const useSearchStore = defineStore('search', () => {
  const results = ref<ExtendedDirectusTranslation[]>([]);

  async function apiSearch(target: string) {
    debounced(async () => {
      // Call the Nuxt server API route instead of the external backend directly to avoid CORS issues initially encountered when coding this assessment.
      const response: { data: DirectusTranslation[] } = await http(`/api/search?target=${encodeURIComponent(target)}`);

      results.value = response.data || [];
    });
  }

  const searchResults = computed(() => results.value.reduce((output, item) => {
    if (!item.updatedAt) {
      item.updatedAt = item.createdAt;
    }

    if (!item.key.includes(':')) {
      output.push(item);
    } else {
      const languageCode = item.key.split(':').at(-1) as keyof typeof LOCALES;
      item.translations.forEach(translation => {
        translation.languages_code = LOCALES[languageCode];
      });
      output[output.length - 1].translations.push(...item.translations);
    }
    return output;
  }, []));

  return { apiSearch, searchResults };
});