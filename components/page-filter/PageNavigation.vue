<script setup lang="ts">
  import { useSearchStore } from '../../stores/searchStore'; // adjust path if needed

  const searchStore = useSearchStore();
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
