<script setup lang="ts">
  import { ref, computed, onMounted, defineProps } from 'vue';
  import { useSearchStore } from '../../stores/searchStore'; // adjust path if needed

  // import { TranslationKey, TranslationKeys } from '~/types';

  const searchStore = useSearchStore();

  const props = defineProps<{
    dataSource: string;
  }>();

  onMounted(() => {
    // Initialize or fetch data if needed
  });

  async function search(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const query = `${props.dataSource}&filter[key][_icontains]=${input.value}`;
    searchStore.apiSearch(query);
  }
</script>

<template>
  <section>
    <input type="text" placeholder="Search for translation keys..." @keyup="search" />
    <!-- <div>{{ searchStore.searchResults }}</div> -->
  </section>
</template>

<style lang="scss" scoped>
</style>
        