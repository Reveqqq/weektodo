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
      :referenceEl="taskRef"
      @card-enter="clearHide"
      @card-leave="scheduleHide"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import HoverCard from './HoverCard.vue'

const showHover = ref(false)
const hideTimeout = ref(null)
const taskRef = ref(null)

function clearHide() {
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value)
    hideTimeout.value = null
  }
}

function scheduleHide() {
  clearHide()
  hideTimeout.value = setTimeout(() => {
    showHover.value = false
    hideTimeout.value = null
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