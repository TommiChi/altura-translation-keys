<script setup lang="ts">
  import { onMounted, defineProps } from 'vue';
  import { useSearchStore } from '../../stores/searchStore'; // adjust path if needed

  const paginationSizes = [
    10, 20, 50, 100
  ] as const;

  const props = defineProps<{
    defaultPageSize: keyof typeof paginationSizes;
  }>();

  const searchStore = useSearchStore();

  async function updatePaginationSize(itemsPerPage: keyof typeof paginationSizes) {
    searchStore.setPaginationSize(itemsPerPage as number);
  }

  updatePaginationSize(props.defaultPageSize);
</script>

<template>
  <div class="page-filter">
    <label v-for="size in paginationSizes" :key="size">
      <input type="radio" name="pageFilterRadio" @change="updatePaginationSize(size)" :checked="size === defaultPageSize" /> {{ size }} keys per page
    </label>
  </div>
</template>

<style lang="scss" scoped>
  .page-filter {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;

    label {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
</style>
