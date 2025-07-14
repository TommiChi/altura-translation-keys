<script setup lang="ts">
  import { ref, computed, onMounted, defineProps } from 'vue';
  import { useSearchStore } from '../../stores/searchStore'; // adjust path if needed

  // import { TranslationKey, TranslationKeys } from '~/types';

  const searchStore = useSearchStore();

  onMounted(() => {
    // Initialize or fetch data if needed
  });

  async function updateDateRange(prop: 'start' | 'end', event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    searchStore.updateDateFilter(prop, input.value);
  }
</script>

<template>
  <div class="nav-controls">
    <span>Page {{ searchStore.currentPage }} of {{ searchStore.totalPages }}</span>
    <button @click="searchStore.updateCurrentPage(-1)" :disabled="searchStore.currentPage <= 1">&laquo;</button>
    <button @click="searchStore.updateCurrentPage(1)" :disabled="searchStore.currentPage >= searchStore.totalPages">&raquo;</button>
  </div>
</template>

<style lang="scss" scoped>
</style>
