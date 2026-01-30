```javascript
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'

export function useHoverCard() {
  const isHovered = ref(false)
  const hoverElement = ref(null)
  const cardElement = ref(null)
  const position = ref({ top: 0, left: 0 })
  const isVisible = ref(false)

  const debouncedHide = useDebounceFn(() => {
    isHovered.value = false
    isVisible.value = false
  }, 200)

  const handleMouseEnter = () => {
    isHovered.value = true
    isVisible.value = true
    debouncedHide.cancel()
    updatePosition()
  }

  const handleMouseLeave = () => {
    debouncedHide()
  }

  const updatePosition = () => {
    if (!hoverElement.value || !cardElement.value) return

    const hoverRect = hoverElement.value.getBoundingClientRect()
    const cardRect = cardElement.value.getBoundingClientRect()

    let top = hoverRect.bottom + window.scrollY
    let left = hoverRect.left + window.scrollX

    if (hoverRect.bottom + cardRect.height > window.innerHeight) {
      top = hoverRect.top + window.scrollY - cardRect.height
    }

    if (hoverRect.left + cardRect.width > window.innerWidth) {
      left = window.innerWidth - cardRect.width - 10
    }

    position.value = { top, left }
  }

  const handleResize = () => {
    if (isHovered.value) {
      updatePosition()
    }
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    debouncedHide.cancel()
  })

  return {
    isHovered,
    isVisible,
    hoverElement,
    cardElement,
    position,
    handleMouseEnter,
    handleMouseLeave,
    updatePosition
  }
}
```