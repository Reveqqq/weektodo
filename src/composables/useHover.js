```javascript
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { debounce } from 'lodash-es'

export function useHover(delay = 150) {
  const isHovered = ref(false)
  const hoverElement = ref(null)
  const hoverCardElement = ref(null)
  const hoverArea = ref(null)

  const handleMouseEnter = debounce(() => {
    isHovered.value = true
  }, delay)

  const handleMouseLeave = debounce(() => {
    isHovered.value = false
  }, delay)

  const setupHoverArea = () => {
    if (!hoverElement.value || !hoverCardElement.value) return

    hoverArea.value = new Set([hoverElement.value, hoverCardElement.value])
  }

  const handleHover = (event) => {
    const relatedTarget = event.relatedTarget
    if (!hoverArea.value || !relatedTarget) return

    const shouldShow = Array.from(hoverArea.value).some(el => 
      el === relatedTarget || el.contains(relatedTarget)
    )

    if (shouldShow) {
      handleMouseEnter()
    } else {
      handleMouseLeave()
    }
  }

  onMounted(() => {
    setupHoverArea()
    if (hoverElement.value) {
      hoverElement.value.addEventListener('mouseenter', handleMouseEnter)
      hoverElement.value.addEventListener('mouseleave', handleHover)
    }
    if (hoverCardElement.value) {
      hoverCardElement.value.addEventListener('mouseenter', handleMouseEnter)
      hoverCardElement.value.addEventListener('mouseleave', handleHover)
    }
  })

  onUnmounted(() => {
    if (hoverElement.value) {
      hoverElement.value.removeEventListener('mouseenter', handleMouseEnter)
      hoverElement.value.removeEventListener('mouseleave', handleHover)
    }
    if (hoverCardElement.value) {
      hoverCardElement.value.removeEventListener('mouseenter', handleMouseEnter)
      hoverCardElement.value.removeEventListener('mouseleave', handleHover)
    }
  })

  return {
    isHovered,
    hoverElement,
    hoverCardElement,
    hoverArea
  }
}
```