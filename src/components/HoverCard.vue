```vue
<template>
  <transition name="fade">
    <div
      v-if="isVisible"
      ref="hoverCard"
      class="hover-card"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'HoverCard',
  props: {
    delay: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      isVisible: false,
      timeout: null
    }
  },
  methods: {
    show() {
      clearTimeout(this.timeout)
      this.isVisible = true
    },
    hide() {
      this.timeout = setTimeout(() => {
        this.isVisible = false
      }, this.delay)
    },
    handleMouseEnter() {
      clearTimeout(this.timeout)
    },
    handleMouseLeave() {
      this.hide()
    }
  }
}
</script>

<style scoped>
.hover-card {
  position: absolute;
  z-index: 100;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 12px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
```