<script setup lang="ts">
  import { ref, computed, onMounted, defineProps } from 'vue';
  import { useSearchStore } from '../../stores/searchStore'; // adjust path if needed

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
    if (!props.hoverElement) return;
    const hoverElementRect = props.hoverElement.getBoundingClientRect();
    const hoverElementBottom = hoverElementRect.bottom + window.scrollY;
    const tooltipContainerBottom = document.documentElement.scrollHeight;
    const tooltipBottom = hoverElementBottom + (tooltip.value?.getBoundingClientRect?.().height || 0);
    position.value = {
      top: `${tooltipBottom > tooltipContainerBottom ? hoverElementBottom - (
        tooltipBottom - tooltipContainerBottom) - 10 : hoverElementBottom - 5}px`,
      left: `${hoverElementRect.left + window.scrollX}px`,
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
    display:block;
  }
</style>
