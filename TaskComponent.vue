```vue
<template>
  <div 
    class="task-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="task-item">
      <!-- Task content -->
      <slot></slot>
    </div>

    <div 
      v-show="isHovered"
      class="hover-card"
      :style="cardPosition"
      @mouseenter="handleCardEnter"
      @mouseleave="handleCardLeave"
    >
      <slot name="hover-content"></slot>
    </div>
  </div>
</template>

<script>
import { ref, computed, onUnmounted } from 'vue'
import { debounce } from 'lodash-es'

export default {
  name: 'TaskComponent',
  setup() {
    const isHovered = ref(false)
    const isCardHovered = ref(false)
    let hideTimeout = null

    const handleMouseEnter = () => {
      clearTimeout(hideTimeout)
      isHovered.value = true
    }

    const handleMouseLeave = debounce(() => {
      if (!isCardHovered.value) {
        isHovered.value = false
      }
    }, 200)

    const handleCardEnter = () => {
      clearTimeout(hideTimeout)
      isCardHovered.value = true
    }

    const handleCardLeave = () => {
      isCardHovered.value = false
      handleMouseLeave()
    }

    const cardPosition = computed(() => {
      // Default positioning logic
      return {
        top: '100%',
        left: '0'
      }
    })

    onUnmounted(() => {
      clearTimeout(hideTimeout)
    })

    return {
      isHovered,
      handleMouseEnter,
      handleMouseLeave,
      handleCardEnter,
      handleCardLeave,
      cardPosition
    }
  }
}
</script>

<style scoped>
.task-container {
  position: relative;
  display: inline-block;
}

.hover-card {
  position: absolute;
  z-index: 100;
  min-width: 200px;
  pointer-events: auto;
}
</style>
```