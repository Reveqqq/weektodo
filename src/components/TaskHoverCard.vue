```vue
<template>
  <div
    class="task-hover-card"
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
    position: {
      type: String,
      default: 'bottom',
      validator: (value) => ['top', 'bottom'].includes(value),
    },
    offset: {
      type: Number,
      default: 8,
    },
  },
  data() {
    return {
      isVisible: false,
      hoverTimeout: null,
    };
  },
  computed: {
    positionStyle() {
      return {
        [this.position === 'top' ? 'bottom' : 'top']: `calc(100% + ${this.offset}px)`,
      };
    },
  },
  methods: {
    handleMouseEnter() {
      clearTimeout(this.hoverTimeout);
      this.isVisible = true;
    },
    handleMouseLeave() {
      this.hoverTimeout = setTimeout(() => {
        this.isVisible = false;
      }, 200);
    },
    cancelHoverTimeout() {
      clearTimeout(this.hoverTimeout);
    },
  },
};
</script>

<style scoped>
.task-hover-card {
  position: absolute;
  left: 0;
  z-index: 10;
  pointer-events: auto;
  transition: opacity 0.2s ease;
}
</style>
```