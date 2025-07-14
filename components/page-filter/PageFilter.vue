<script setup lang="ts">
  import { ref, computed, onMounted, defineProps } from 'vue';
  import { useSearchStore } from '../../stores/searchStore'; // adjust path if needed

  // import { TranslationKey, TranslationKeys } from '~/types';

  const paginationSizes = [
    10, 20, 50, 100
  ] as const;

  const props = defineProps<{
    defaultPageSize: keyof typeof paginationSizes;
  }>();

  const searchStore = useSearchStore();

  onMounted(() => {
    // Initialize or fetch data if needed
  });

  async function updatePaginationSize(itemsPerPage: keyof typeof paginationSizes) {
    searchStore.setPaginationSize(itemsPerPage as number);
  }

  updatePaginationSize(props.defaultPageSize);
</script>

<template>
  <div>
    <label v-for="size in paginationSizes" :key="size">
      <input type="radio" name="pageFilterRadio" @change="updatePaginationSize(size)" :checked="size === defaultPageSize" /> {{ size }} keys per page
    </label>
  </div>
</template>

<style lang="scss" scoped>
</style>
