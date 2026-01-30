```vue
<template>
  <div
    ref="hoverCard"
    class="hover-card"
    :style="{
      top: `${position.y}px`,
      left: `${position.x}px`,
      visibility: isVisible ? 'visible' : 'hidden',
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    targetElement: {
      type: HTMLElement,
      default: null,
    },
  },
  data() {
    return {
      isVisible: false,
      position: { x: 0, y: 0 },
      hoverTimeout: null,
    };
  },
  methods: {
    updatePosition() {
      if (!this.targetElement) return;

      const rect = this.targetElement.getBoundingClientRect();
      const cardHeight = this.$refs.hoverCard?.offsetHeight || 0;

      let y = rect.bottom + window.scrollY;
      if (window.innerHeight - rect.bottom < cardHeight) {
        y = rect.top + window.scrollY - cardHeight;
      }

      this.position = {
        x: rect.left + window.scrollX,
        y,
      };
    },
    handleMouseEnter() {
      clearTimeout(this.hoverTimeout);
      this.isVisible = true;
    },
    handleMouseLeave() {
      this.hoverTimeout = setTimeout(() => {
        this.isVisible = false;
      }, 200);
    },
  },
  mounted() {
    window.addEventListener('resize', this.updatePosition);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updatePosition);
    clearTimeout(this.hoverTimeout);
  },
};
</script>

<style scoped>
.hover-card {
  position: absolute;
  z-index: 1000;
  pointer-events: auto;
  transition: visibility 0.1s ease;
}
</style>
```