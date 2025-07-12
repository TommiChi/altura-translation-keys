<script setup lang="ts">
  import { ref, computed, onMounted, defineProps } from 'vue';
  import { useSearchStore } from '../../stores/searchStore'; // adjust path if 
  import Tooltip from '../tooltip/Tooltip.vue';

  // import { TranslationKey, TranslationKeys } from '~/types';

  const searchStore = useSearchStore();
  const activeRow = ref<number | null>(null);
  const activeCell = ref<HTMLElement | null>(null);

  onMounted(() => {
    // Initialize or fetch data if needed
  });

  function setTooltip(index: number, event: MouseEvent) {
    activeCell.value = event.target as HTMLElement;
    activeRow.value = index;
  }

  function clearTooltip() {
    activeRow.value = null;
  }
</script>

<template>
  <div>
    <section v-if="searchStore.searchResults.length > 0">
      <h3>{{ searchStore.searchResults.length }} Keys Found</h3>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Translation</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in searchStore.searchResults" :key="item.id">
            <td>{{ item.key }}</td>
            <td @mouseleave="clearTooltip" @mouseenter="setTooltip(index, $event)">{{ item.translations[0].value }}</td>
            <td>{{ item.updatedAt }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <Tooltip v-if="activeRow !== null" :hover-element="activeCell">
      <ul class="tooltip-content">
        <li v-for="(item, index) in searchStore.searchResults[activeRow].translations" :key="item.id">{{ item.value }}</li>
      </ul>
    </Tooltip>
  </div>
</template>

<style lang="scss" scoped>
</style>
        