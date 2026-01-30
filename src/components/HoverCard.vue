```vue
<template>
  <div
    ref="hoverCard"
    class="hover-card"
    :class="[position, { visible: isVisible }]"
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
  },

  data() {
    return {
      isVisible: false,
      showTimeout: null,
      hideTimeout: null,
    };
  },

  methods: {
    show() {
      clearTimeout(this.hideTimeout);
      this.showTimeout = setTimeout(() => {
        this.isVisible = true;
      }, 100);
    },

    hide() {
      clearTimeout(this.showTimeout);
      this.hideTimeout = setTimeout(() => {
        this.isVisible = false;
      }, 200);
    },

    handleMouseEnter() {
      clearTimeout(this.hideTimeout);
    },

    handleMouseLeave() {
      this.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.hover-card {
  position: absolute;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
  z-index: 100;
  width: max-content;
  max-width: 300px;

  &.visible {
    opacity: 1;
    pointer-events: all;
  }

  &.top {
    bottom: calc(100% + 8px);
    left: 0;
  }

  &.bottom {
    top: calc(100% + 8px);
    left: 0;
  }
}
</style>
```