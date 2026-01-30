```vue
<template>
  <div
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
    isVisible: {
      type: Boolean,
      default: false
    },
    position: {
      type: Object,
      default: () => ({ top: 0, left: 0 })
    }
  },
  data() {
    return {
      hideTimeout: null,
      isHovered: false
    }
  },
  computed: {
    cardStyle() {
      return {
        top: `${this.position.top}px`,
        left: `${this.position.left}px`,
        'pointer-events': this.isVisible ? 'auto' : 'none'
      }
    }
  },
  methods: {
    handleMouseEnter() {
      clearTimeout(this.hideTimeout)
      this.isHovered = true
    },
    handleMouseLeave() {
      this.hideTimeout = setTimeout(() => {
        this.isHovered = false
        this.$emit('close')
      }, 200)
    }
  }
}
</script>

<style scoped>
.hover-card {
  position: absolute;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.hover-card.is-visible {
  opacity: 1;
  pointer-events: auto;
}
</style>
```