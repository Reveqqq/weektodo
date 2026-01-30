<template>
  <div
    class="hover-card"
    ref="cardRef"
    @mouseenter.stop="keepHover"
    @mouseleave.stop="endHover"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { createPopper } from '@popperjs/core';

export default defineComponent({
  name: 'HoverCard',
  props: {
    referenceEl: {
      type: HTMLElement,
      required: true
    },
    popperOptions: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['keep-hover', 'end-hover'],
  setup(props, { emit }) {
    const cardRef = ref(null);
    let popperInstance = null;

    const initPopper = () => {
      if (props.referenceEl && cardRef.value) {
        const defaultOptions = {
          placement: 'bottom-start',
          modifiers: [
            { name: 'offset', options: { offset: [0, 8] } },
            { name: 'preventOverflow', options: { padding: 8 } },
            { name: 'flip', options: { fallbackPlacements: ['top-start'] } }
          ]
        };
        const options = { ...defaultOptions, ...props.popperOptions };
        popperInstance = createPopper(props.referenceEl, cardRef.value, options);
      }
    };

    const destroyPopper = () => {
      if (popperInstance) {
        popperInstance.destroy();
        popperInstance = null;
      }
    };

    const keepHover = () => {
      emit('keep-hover');
    };

    const endHover = () => {
      emit('end-hover');
    };

    onMounted(() => {
      initPopper();
    });

    onBeforeUnmount(() => {
      destroyPopper();
    });

    watch(
      () => props.referenceEl,
      () => {
        destroyPopper();
        initPopper();
      }
    );

    return {
      cardRef,
      keepHover,
      endHover
    };
  }
});
</script>

<style scoped>
.hover-card {
  pointer-events: auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 12px;
  z-index: 1000;
}
</style>