```vue
<template>
  <div
    ref="hoverCardRef"
    class="task-hover-card"
    :class="{ 'is-visible': isVisible }"
    :style="cardStyles"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

export default {
  props: {
    position: {
      type: String,
      default: 'bottom',
      validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
    },
    offset: {
      type: Number,
      default: 8
    },
    targetElement: {
      type: HTMLElement,
      default: null
    }
  },

  setup(props) {
    const hoverCardRef = ref(null)
    const isVisible = ref(false)
    const isHovered = ref(false)
    const debouncedHide = useDebounceFn(() => {
      if (!isHovered.value) {
        isVisible.value = false
      }
    }, 200)

    const cardStyles = computed(() => {
      if (!props.targetElement || !hoverCardRef.value) return {}

      const targetRect = props.targetElement.getBoundingClientRect()
      const cardRect = hoverCardRef.value.getBoundingClientRect()

      let top, left

      switch (props.position) {
        case 'top':
          top = targetRect.top - cardRect.height - props.offset
          left = targetRect.left + targetRect.width / 2 - cardRect.width / 2
          break
        case 'bottom':
          top = targetRect.bottom + props.offset
          left = targetRect.left + targetRect.width / 2 - cardRect.width / 2
          break
        case 'left':
          top = targetRect.top + targetRect.height / 2 - cardRect.height / 2
          left = targetRect.left - cardRect.width - props.offset
          break
        case 'right':
          top = targetRect.top + targetRect.height / 2 - cardRect.height / 2
          left = targetRect.right + props.offset
          break
        default:
          top = targetRect.bottom + props.offset
          left = targetRect.left + targetRect.width / 2 - cardRect.width / 2
      }

      // Ensure card stays within viewport
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      if (left + cardRect.width > viewportWidth) {
        left = viewportWidth - cardRect.width - props.offset
      } else if (left < 0) {
        left = props.offset
      }

      if (top + cardRect.height > viewportHeight) {
        top = viewportHeight - cardRect.height - props.offset
      } else if (top < 0) {
        top = props.offset
      }

      return {
        top: `${Math.max(top, 0)}px`,
        left: `${Math.max(left, 0)}px`
      }
    })

    const handleMouseEnter = () => {
      isHovered.value = true
      isVisible.value = true
    }

    const handleMouseLeave = () => {
      isHovered.value = false
      debouncedHide()
    }

    watch(
      () => props.targetElement,
      (newVal) => {
        if (newVal) {
          newVal.addEventListener('mouseenter', handleMouseEnter)
          newVal.addEventListener('mouseleave', handleMouseLeave)
        }
      },
      { immediate: true }
    )

    return {
      hoverCardRef,
      isVisible,
      cardStyles,
      handleMouseEnter,
      handleMouseLeave
    }
  }
}
</script>

<style scoped>
.task-hover-card {
  position: fixed;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  background: var(--bg-primary);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.task-hover-card.is-visible {
  opacity: 1;
  pointer-events: auto;
}
</style>
```