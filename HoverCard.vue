```vue
<template>
  <div
    ref="popperEl"
    class="hover-card"
    @mouseenter="onCardEnter"
    @mouseleave="onCardLeave"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { createPopper, type Instance as PopperInstance } from '@popperjs/core'

const props = defineProps<{
  /** Element that triggers the hover card (the task row) */
  referenceEl: HTMLElement
  /** Controls visibility – parent toggles via v-if */
  /** (kept for type completeness, not used directly) */
}>()

const emit = defineEmits<{
  (e: 'card-enter'): void
  (e: 'card-leave'): void
}>()

const popperEl = ref<HTMLElement | null>(null)
let popperInstance: PopperInstance | null = null

const initPopper = () => {
  if (props.referenceEl && popperEl.value) {
    popperInstance = createPopper(props.referenceEl, popperEl.value, {
      placement: 'bottom',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            boundary: 'clippingParents',
          },
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

const onCardEnter = () => {
  emit('card-enter')
}

const onCardLeave = () => {
  emit('card-leave')
}

/* Re‑initialize popper if the reference element changes */
watch(
  () => props.referenceEl,
  () => {
    destroyPopper()
    initPopper()
  },
)

onMounted(() => {
  initPopper()
})

onBeforeUnmount(() => {
  destroyPopper()
})
</script>

<style scoped>
.hover-card {
  position: absolute;
  pointer-events: auto;
  z-index: 1000;
  background: var(--card-bg, #fff);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 0.75rem;
}
</style>
```