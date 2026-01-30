```vue
<template>
  <div class="task-item"
       @mouseenter="onMouseEnter"
       @mouseleave="onMouseLeave">
    <div class="task-content">
      <slot />
    </div>
    <HoverCard v-if="showHover"
               :task="task"
               @mouseenter.stop="keepHover"
               @mouseleave.stop="endHover" />
  </div>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'
import HoverCard from './HoverCard.vue'

export default {
  name: 'TaskItem',
  components: { HoverCard },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup() {
    const showHover = ref(false)
    let hideTimer = null

    const clearTimer = () => {
      if (hideTimer) {
        clearTimeout(hideTimer)
        hideTimer = null
      }
    }

    const onMouseEnter = () => {
      clearTimer()
      showHover.value = true
    }

    const onMouseLeave = () => {
      hideTimer = setTimeout(() => {
        showHover.value = false
      }, 150)
    }

    const keepHover = () => {
      clearTimer()
      showHover.value = true
    }

    const endHover = () => {
      hideTimer = setTimeout(() => {
        showHover.value = false
      }, 150)
    }

    onBeforeUnmount(() => {
      clearTimer()
    })

    return {
      showHover,
      onMouseEnter,
      onMouseLeave,
      keepHover,
      endHover
    }
  }
}
</script>

<style scoped>
.task-item {
  position: relative;
}
</style>
```
