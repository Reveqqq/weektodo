```vue
<template>
  <div
    ref="hoverCard"
    class="hover-card"
    :class="{ 'hover-card--bottom': position === 'bottom' }"
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
      default: 'top',
      validator: (value) => ['top', 'bottom'].includes(value),
    },
    offset: {
      type: Number,
      default: 8,
    },
  },
  data() {
    return {
      isHovered: false,
      cardStyles: {},
    };
  },
  methods: {
    updatePosition(target) {
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const cardHeight = this.$refs.hoverCard?.offsetHeight || 0;

      if (this.position === 'bottom') {
        this.cardStyles = {
          top: `${rect.bottom + this.offset}px`,
          left: `${rect.left}px`,
        };
      } else {
        this.cardStyles = {
          top: `${rect.top - cardHeight - this.offset}px`,
          left: `${rect.left}px`,
        };
      }
    },
    handleMouseEnter() {
      this.isHovered = true;
    },
    handleMouseLeave(event) {
      if (!this.isHovered) return;

      const relatedTarget = event.relatedTarget;
      const isLeavingToParent = this.$el.contains(relatedTarget) || relatedTarget?.closest('.task-item');

      if (!isLeavingToParent) {
        this.isHovered = false;
        this.$emit('close');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hover-card {
  position: fixed;
  z-index: 1000;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 12px;
  transition: opacity 0.2s ease;

  &--bottom {
    margin-top: 4px;
  }
}
</style>
```