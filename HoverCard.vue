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
defineOptions({ name: 'HoverCard' })

const props = defineProps<{
  /** Element that triggers the hover card (the task row) */
  referenceEl: HTMLElement | null
}>()

const emit = defineEmits<{
  (e: 'card-enter'): void
  (e: 'card-leave'): void
}>()

const popperEl = ref<HTMLElement | null>(null)
let popperInstance: Instance | null = null

const initPopper = () => {
  if (props.referenceEl && popperEl.value) {
    popperInstance = createPopper(props.referenceEl, popperEl.value, {
      placement: 'bottom',
      modifiers: [
        { name: 'offset', options: { offset: [0, 8] } },
        { name: 'preventOverflow', options: { boundary: 'clippingParents' } },
        { name: 'flip', options: { fallbackPlacements: ['top'] } },
      ],
    })
  }
}

const destroyPopper = () => {
  popperInstance?.destroy()
  popperInstance = null
}

watch(
  () => props.referenceEl,
  () => {
    destroyPopper()
    initPopper()
  },
)

onMounted(initPopper)
onBeforeUnmount(destroyPopper)

const onCardEnter = () => emit('card-enter')
const onCardLeave = () => emit('card-leave')
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
  opacity: 1;
  transition: opacity 0.15s ease-in-out;
}
</style>
```