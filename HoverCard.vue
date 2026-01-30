```vue
<template>
  <div
    ref="hoverCard"
    class="hover-card"
    :class="positionClass"
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
      validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value),
    },
    offset: {
      type: Number,
      default: 8,
    },
  },
  data() {
    return {
      isHovered: false,
      calculatedPosition: this.position,
    };
  },
  computed: {
    positionClass() {
      return `hover-card--${this.calculatedPosition}`;
    },
    cardStyles() {
      return {
        '--offset': `${this.offset}px`,
        'pointer-events': 'auto',
      };
    },
  },
  methods: {
    handleMouseEnter() {
      this.isHovered = true;
      this.$emit('hover-enter');
    },
    handleMouseLeave(event) {
      if (this.$refs.hoverCard.contains(event.relatedTarget)) return;
      this.isHovered = false;
      this.$emit('hover-leave');
    },
    updatePosition() {
      if (!this.$el || !this.$el.parentElement) return;

      const rect = this.$el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      if (this.position === 'bottom' && rect.bottom > viewportHeight) {
        this.calculatedPosition = 'top';
      } else if (this.position === 'top' && rect.top < 0) {
        this.calculatedPosition = 'bottom';
      } else if (this.position === 'right' && rect.right > viewportWidth) {
        this.calculatedPosition = 'left';
      } else if (this.position === 'left' && rect.left < 0) {
        this.calculatedPosition = 'right';
      } else {
        this.calculatedPosition = this.position;
      }
    },
  },
  mounted() {
    this.updatePosition();
    window.addEventListener('resize', this.updatePosition);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updatePosition);
  },
};
</script>

<style scoped>
.hover-card {
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.hover-card--bottom {
  top: calc(100% + var(--offset));
  left: 0;
}

.hover-card--top {
  bottom: calc(100% + var(--offset));
  left: 0;
}

.hover-card--left {
  right: calc(100% + var(--offset));
  top: 0;
}

.hover-card--right {
  left: calc(100% + var(--offset));
  top: 0;
}
</style>
```