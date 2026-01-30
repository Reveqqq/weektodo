```vue
<template>
  <div
    v-if="isVisible"
    ref="hoverCard"
    class="hover-card"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
  >
    <slot />
  </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'HoverCard',
  props: {
    target: {
      type: HTMLElement,
      required: true,
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    handleMouseOver() {
      this.isVisible = true;
    },
    handleMouseOut(event) {
      if (!this.$el.contains(event.relatedTarget) && event.relatedTarget !== this.target) {
        this.debouncedHide();
      }
    },
    debouncedHide: debounce(function() {
      this.isVisible = false;
    }, 100),
  },
  mounted() {
    this.target.addEventListener('mouseover', this.handleMouseOver);
    this.target.addEventListener('mouseout', this.handleMouseOut);
  },
  beforeDestroy() {
    this.target.removeEventListener('mouseover', this.handleMouseOver);
    this.target.removeEventListener('mouseout', this.handleMouseOut);
  },
};
</script>

<style scoped>
.hover-card {
  position: absolute;
  z-index: 1000;
  padding: 8px 0;
}
</style>
```