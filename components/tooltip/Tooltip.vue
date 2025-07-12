<script setup lang="ts">
  import { ref, computed, onMounted, defineProps } from 'vue';
  import { useSearchStore } from '../../stores/searchStore'; // adjust path if needed

  // import { TranslationKey, TranslationKeys } from '~/types';

  const props = defineProps<{
    hoverElement: HTMLElement;
  }>();

  const tooltip = ref<HTMLElement | null>(null);

  const searchStore = useSearchStore();

  const position = ref({
    top: '0px',
    left: '0px',
  });

  onMounted(() => {
    position.value = {
      top: `${props.hoverElement.getBoundingClientRect().bottom + window.scrollY}px`,
      left: `${props.hoverElement.getBoundingClientRect().left + window.scrollX}px`,
    };
  });
</script>

<template>
  <dialog v-if="searchStore.searchResults.length > 0" ref="tooltip" :style="position">
    <slot></slot>
  </dialog>
</template>

<style lang="scss" scoped>
  dialog {
    position: absolute;
    top: 0;
    left: 0;
    border: solid 1px red;
    padding: 10px;
    display:block;
  }
</style>
