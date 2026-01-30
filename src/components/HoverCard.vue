```vue
<template>
  <div
    ref="cardRef"
    class="hover-card"
    :class="{ 'is-visible': visible }"
    @mouseenter="onCardEnter"
    @mouseleave="onCardLeave"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, defineProps, defineEmits } from 'vue'
import {
  createPopper,
  type Instance as PopperInstance,
  type Placement,
} from '@popperjs/core'

const props = defineProps<{
  /** Element that triggers the hover card (the task row) */
  referenceEl: HTMLElement | null
  /** Preferred placement – defaults to 'bottom' */
  placement?: Placement
  /** Control visibility of the card */
  visible?: boolean
}>()

const emit = defineEmits<{
  (e: 'card-enter'): void
  (e: 'card-leave'): void
}>()

const cardRef = ref<HTMLElement | null>(null)
let popperInstance: PopperInstance | null = null

const initPopper = () => {
  if (props.referenceEl && cardRef.value) {
    popperInstance = createPopper(props.referenceEl, cardRef.value, {
      placement: props.placement ?? 'bottom',
      modifiers: [
        { name: 'offset', options: { offset: [0, 8] } },
        { name: 'preventOverflow', options: { padding: 8 } },
        {
          name: 'flip',
          options: { fallbackPlacements: ['top', 'right', 'left'] },
        },
      ],
    })
  }
}

const destroyPopper = () => {
  if (popperInstance) {
    popperInstance.destroy()
    popperInstance = null
  }
}

/* Re‑init popper when reference element changes */
watch(
  () => props.referenceEl,
  (newRef) => {
    destroyPopper()
    if (newRef) initPopper()
  },
  { immediate: true },
)

onMounted(() => {
  initPopper()
})

onBeforeUnmount(() => {
  destroyPopper()
})

const onCardEnter = () => emit('card-enter')
const onCardLeave = () => emit('card-leave')
</script>

<style scoped>
.hover-card {
  position: absolute;
  pointer-events: auto;
  z-index: 1000;
  background: var(--card-bg, #fff);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 12px;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
}
.hover-card.is-visible {
  opacity: 1;
}
</style>
```