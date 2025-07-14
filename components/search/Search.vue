<script setup lang="ts">
  import { defineProps } from 'vue';
  import { useSearchStore } from '../../stores/searchStore';

  const searchStore = useSearchStore();

  const props = defineProps<{
    dataSource: string;
  }>();

  async function search(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const query = `${props.dataSource}&filter[key][_icontains]=${input.value}`;
    searchStore.apiSearch(query);
  }
</script>

<template>
  <section>
    <img src="/goose.png" alt="logo" />
    <input type="text" placeholder="Search for translation keys..." @keyup="search" />
  </section>
</template>

<style lang="scss" scoped>
  input {
    width: 90%;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  section {
    display: flex;
    flex-direction: row;
    gap: 10px;
    height: 30px;
    align-items: center;
  }
</style>
        