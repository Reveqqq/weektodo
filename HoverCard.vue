```vue
<template>
  <div
    ref="hoverCard"
    class="hover-card"
    :class="{ 'is-visible': isVisible }"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
  >
    <slot />
  </div>
</template>

<script>
import { debounce } from 'lodash-es';

export default {
  name: 'HoverCard',
  props: {
    taskId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isVisible: false,
      hideDebounced: debounce(() => {
        this.isVisible = false;
      }, 100),
    };
  },
  methods: {
    handleMouseOver() {
      this.hideDebounced.cancel();
      this.isVisible = true;
    },
    handleMouseOut(event) {
      const relatedTarget = event.relatedTarget;
      if (!relatedTarget || !this.$refs.hoverCard.contains(relatedTarget)) {
        this.hideDebounced();
      }
    },
    updatePosition() {
      if (this.isVisible && this.$refs.hoverCard) {
        this.$nextTick(() => {
          const { top, left } = this.$parent.$el.getBoundingClientRect();
          this.$refs.hoverCard.style.top = `${top - this.$refs.hoverCard.offsetHeight - 8}px`;
          this.$refs.hoverCard.style.left = `${left}px`;
        });
      }
    },
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.updatePosition();
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.updatePosition);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updatePosition);
    this.hideDebounced.cancel();
  },
};
</script>

<style scoped>
.hover-card {
  position: fixed;
  z-index: 1000;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: auto;
  padding: 8px 0;
}

.hover-card.is-visible {
  opacity: 1;
}
</style>
```