```vue
<template>
  <div
    ref="hoverCard"
    class="hover-card"
    :style="positionStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    offset: {
      type: Object,
      default: () => ({ x: 0, y: 0 })
    }
  },
  data() {
    return {
      positionStyle: {
        top: '0',
        left: '0',
        opacity: 0,
        pointerEvents: 'none'
      },
      isHovered: false,
      showTimeout: null,
      hideTimeout: null
    }
  },
  methods: {
    updatePosition(target) {
      if (!target) return

      const rect = target.getBoundingClientRect()
      this.positionStyle = {
        top: `${rect.top + rect.height + this.offset.y}px`,
        left: `${rect.left + this.offset.x}px`,
        opacity: 1,
        pointerEvents: 'auto'
      }
    },
    handleMouseEnter() {
      clearTimeout(this.hideTimeout)
      this.isHovered = true
    },
    handleMouseLeave() {
      this.hideTimeout = setTimeout(() => {
        if (!this.isHovered) {
          this.positionStyle.opacity = 0
          this.positionStyle.pointerEvents = 'none'
        }
      }, 200)
    },
    show(target) {
      clearTimeout(this.hideTimeout)
      this.showTimeout = setTimeout(() => {
        this.updatePosition(target)
      }, 100)
    },
    hide() {
      this.isHovered = false
      this.handleMouseLeave()
    }
  },
  beforeDestroy() {
    clearTimeout(this.showTimeout)
    clearTimeout(this.hideTimeout)
  }
}
</script>

<style scoped>
.hover-card {
  position: fixed;
  z-index: 1000;
  transition: opacity 0.2s ease;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 12px;
}
</style>
```