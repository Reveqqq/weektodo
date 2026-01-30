```vue
<template>
  <div
    v-show="visible"
    ref="card"
    class="hover-card"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { createPopper } from '@popperjs/core';

const props = defineProps({
  /** Element the card should be attached to (task row) */
  referenceEl: {
    type: Object,
    required: true,
  },
  /** Wrapper that contains both the task row and the card */
  wrapperEl: {
    type: Object,
    required: true,
  },
  /** Visibility flag controlled from parent */
  visible: {
    type: Boolean,
    default: false,
  },
  /** Popper placement */
  placement: {
    type: String,
    default: 'right-start',
  },
});

const emit = defineEmits(['update:visible']);

const card = ref(null);
let popperInstance = null;
let hideTimeout = null;

const show = () => emit('update:visible', true);
const hide = () => emit('update:visible', false);

const onMouseEnter = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
  show();
};

const onMouseLeave = () => {
  hideTimeout = setTimeout(() => {
    hide();
    hideTimeout = null;
  }, 150);
};

watch(
  () => props.visible,
  (val) => {
    if (val && popperInstance) {
      popperInstance.update();
    }
  }
);

onMounted(() => {
  if (props.referenceEl && card.value) {
    popperInstance = createPopper(props.referenceEl, card.value, {
      placement: props.placement,
      strategy: 'fixed',
      modifiers: [
        {
          name: 'offset',
          options: { offset: [0, 8] },
        },
        {
          name: 'preventOverflow',
          options: {
            boundary: props.wrapperEl,
            padding: 8,
          },
        },
      ],
    });
  }
});

onBeforeUnmount(() => {
  if (popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }
});
</script>

<style scoped>
.hover-card {
  position: absolute;
  pointer-events: auto;
  z-index: 1000;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
```