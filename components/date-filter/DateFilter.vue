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

  async function updateDateRange(prop: 'start' | 'end', event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const query = `${props.dataSource}&filter[key][_icontains]=${input.value}`;
    searchStore.updateDateFilter(prop, input.value);
  }
</script>

<template>
  <div>
    <label>
      From
      <input type="text" placeholder="dd-mm-yyyy" @keyup="updateDateRange('start', $event)" />
    </label>
    <label>
      To
      <input type="text" placeholder="dd-mm-yyyy" @keyup="updateDateRange('end', $event)" />
    </label>
  </div>
</template>

<style lang="scss" scoped>
</style>
