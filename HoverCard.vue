```vue
<template>
  <div
    class="hover-card"
    :class="{ 'hover-card--top': position === 'top' }"
    :style="computedStyles"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'HoverCard',
  props: {
    position: {
      type: String,
      default: 'bottom',
      validator: (value) => ['top', 'bottom'].includes(value)
    },
    offset: {
      type: Number,
      default: 8
    },
    width: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      isHovered: false
    }
  },
  computed: {
    computedStyles() {
      const styles = {
        '--offset': `${this.offset}px`
      }
      if (this.width) {
        styles.width = `${this.width}px`
      }
      return styles
    }
  },
  methods: {
    handleMouseEnter() {
      this.isHovered = true
      this.$emit('hover-change', true)
    },
    handleMouseLeave() {
      this.isHovered = false
      this.$emit('hover-change', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.hover-card {
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 10;
  pointer-events: auto;
  opacity: 0;
  transition: opacity 0.2s ease;

  &--top {
    bottom: calc(100% + var(--offset));
  }

  &:not(.hover-card--top) {
    top: calc(100% + var(--offset));
  }
}

.hover-card:hover,
.hover-card.is-active {
  opacity: 1;
}
</style>
```