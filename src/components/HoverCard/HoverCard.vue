```vue
<template>
  <div
    ref="hoverCard"
    class="hover-card"
    :class="{ 'is-visible': isVisible }"
    :style="cardStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HoverCard',
  props: {
    targetElement: {
      type: HTMLElement,
      default: null
    },
    position: {
      type: String,
      default: 'bottom'
    },
    offset: {
      type: Number,
      default: 8
    }
  },
  data() {
    return {
      isVisible: false,
      coordinates: {
        top: 0,
        left: 0
      },
      isHovered: false
    }
  },
  computed: {
    cardStyle() {
      return {
        top: `${this.coordinates.top}px`,
        left: `${this.coordinates.left}px`,
        opacity: this.isVisible ? 1 : 0,
        'pointer-events': this.isVisible ? 'auto' : 'none'
      }
    }
  },
  methods: {
    updatePosition() {
      if (!this.targetElement || !this.$refs.hoverCard) return

      const targetRect = this.targetElement.getBoundingClientRect()
      const cardRect = this.$refs.hoverCard.getBoundingClientRect()
      const scrollY = window.scrollY || window.pageYOffset

      switch (this.position) {
        case 'bottom':
          this.coordinates = {
            top: targetRect.bottom + this.offset + scrollY,
            left: targetRect.left + (targetRect.width - cardRect.width) / 2
          }
          break
        case 'top':
          this.coordinates = {
            top: targetRect.top - cardRect.height - this.offset + scrollY,
            left: targetRect.left + (targetRect.width - cardRect.width) / 2
          }
          break
        case 'right':
          this.coordinates = {
            top: targetRect.top + scrollY,
            left: targetRect.right + this.offset
          }
          break
        case 'left':
          this.coordinates = {
            top: targetRect.top + scrollY,
            left: targetRect.left - cardRect.width - this.offset
          }
          break
        default:
          this.coordinates = {
            top: targetRect.bottom + this.offset + scrollY,
            left: targetRect.left
          }
      }
    },
    handleMouseEnter() {
      this.isHovered = true
    },
    handleMouseLeave() {
      this.isHovered = false
      this.hideWithDelay()
    },
    show() {
      this.isVisible = true
      this.$nextTick(this.updatePosition)
    },
    hide() {
      if (!this.isHovered) {
        this.isVisible = false
      }
    },
    hideWithDelay() {
      setTimeout(() => {
        this.hide()
      }, 300)
    }
  },
  mounted() {
    window.addEventListener('resize', this.updatePosition)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updatePosition)
  }
}
</script>

<style lang="scss" scoped>
.hover-card {
  position: absolute;
  z-index: 1000;
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: center top;
  pointer-events: none;

  &.is-visible {
    pointer-events: auto;
  }
}
</style>
```