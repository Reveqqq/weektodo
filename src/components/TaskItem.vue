```vue
<template>
  <div
    class="task-item"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    ref="taskRef"
  >
    <div class="task-content">
      <slot />
    </div>

    <HoverCard
      v-if="showHover"
      :reference="taskRef"
      @card-enter="clearHide"
      @card-leave="scheduleHide"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import HoverCard from './HoverCard.vue'

const showHover = ref(false)
let hideTimeout: ReturnType<typeof setTimeout> | null = null
const taskRef = ref<HTMLElement | null>(null)

function clearHide() {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

function scheduleHide() {
  clearHide()
  hideTimeout = setTimeout(() => {
    showHover.value = false
    hideTimeout = null
  }, 200)
}

function onMouseEnter() {
  clearHide()
  showHover.value = true
}

function onMouseLeave() {
  scheduleHide()
}

onBeforeUnmount(() => {
  clearHide()
})
</script>

<style scoped>
.task-item {
  position: relative;
}
</style>
```