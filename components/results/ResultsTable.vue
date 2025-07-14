<script setup lang="ts">
  import { ref, computed, onMounted, defineProps } from 'vue';
  import { useSearchStore } from '../../stores/searchStore'; // adjust path if 
  import Tooltip from '../tooltip/Tooltip.vue';

  const searchStore = useSearchStore();
  const activeRow = ref<number | null>(null);
  const activeCell = ref<HTMLElement | null>(null);

  const props = defineProps<{
    paginated?: boolean;
  }>();

  const flags: Record<string, string> = {
    'en-GB': '🇬🇧',
    'fr-FR': '🇫🇷',
    'nl-NL': '🇳🇱',
  };

  const results = computed(() => {
    return props.paginated ? searchStore.currentPageResults : searchStore.searchResults;
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
    <section v-if="results.length > 0">
      <h3>{{ results.length }} Keys Found</h3>
      <table class="results-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Translation</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in results" :key="item.id">
            <td>{{ item.key }}</td>
            <td @mouseleave="clearTooltip" @mouseenter="setTooltip(index, $event)">{{ item.translations[0].value }}</td>
            <td>{{ item.updatedAt }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <Tooltip class="tooltip-container" :hover-element="activeCell" v-if="activeCell !== null && activeRow !== null">
      <ul class="tooltip-content">
        <li class="tooltip-item" v-for="(item) in results[activeRow].translations" :key="item.id">
          <span>{{ flags[item.languages_code] }}</span>
          <span>{{ item.value }}</span>
        </li>
      </ul>
    </Tooltip>
  </div>
</template>

<style lang="scss" scoped>
  .results-table {
    width: 100vw;
    border-top: solid 1px rgba(0, 0, 0, 0.5);
    border-bottom: solid 1px rgba(0, 0, 0, 0.5);

    & td {
      border-top: solid 1px rgba(0, 0, 0, 0.5);
      text-align: left;
      padding: 10px;
    }

    & th {
      text-align: left;
      padding: 10px;
    }
  }
  
  .tooltip-content {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .tooltip-container {
    background-color: #ffffff;
    border: none;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    padding: 10px;
    max-width: 300px;
  }

  .tooltip-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
  }

  h3 {
    padding-left: 10px;
  }
</style>
