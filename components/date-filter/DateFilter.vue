<script setup lang="ts">
  import { useSearchStore } from '../../stores/searchStore'; // adjust path if needed

  const searchStore = useSearchStore();

  async function updateDateRange(prop: 'start' | 'end', event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
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
  label:last-child {
    margin-left: 10px;
  }

  input {
    width: 110px;
  }
</style>
