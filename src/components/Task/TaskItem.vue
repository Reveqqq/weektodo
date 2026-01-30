```vue
<template>
  <div class="task-item" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="task-content">
      <slot name="default"></slot>
    </div>
    
    <div 
      v-if="showHoverCard"
      class="hover-card-container"
      @mouseenter="handleCardEnter"
      @mouseleave="handleCardLeave"
    >
      <slot name="hover-card"></slot>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

export default {
  name: 'TaskItem',
  setup() {
    const showHoverCard = ref(false)
    let hoverTimeout = null

    const debouncedHide = useDebounceFn(() => {
      showHoverCard.value = false
    }, 200)

    const handleMouseEnter = () => {
      clearTimeout(hoverTimeout)
      showHoverCard.value = true
    }

    const handleMouseLeave = () => {
      debouncedHide()
    }

    const handleCardEnter = () => {
      clearTimeout(hoverTimeout)
      showHoverCard.value = true
    }

    const handleCardLeave = () => {
      debouncedHide()
    }

    return {
      showHoverCard,
      handleMouseEnter,
      handleMouseLeave,
      handleCardEnter,
      handleCardLeave
    }
  }
}
</script>

<style scoped>
.task-item {
  position: relative;
  display: inline-block;
}

.hover-card-container {
  position: absolute;
  z-index: 100;
  pointer-events: auto;
  top: 100%;
  left: 0;
  margin-top: 4px;
}
</style>
```