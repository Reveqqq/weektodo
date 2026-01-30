```vue
<template>
  <div
    ref="hoverCard"
    class="hover-card"
    :class="{ 'hover-card--top': position === 'top' }"
    :style="cardStyles"
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
    }
  },
  data() {
    return {
      isHovered: false
    }
  },
  computed: {
    cardStyles() {
      return {
        [this.position === 'top' ? 'bottom' : 'top']: `calc(100% + ${this.offset}px)`
      }
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
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  padding: var(--space-xs);
  transition: opacity 0.2s ease;

  &--top {
    bottom: calc(100% + var(--space-xs));
  }
}
</style>
```