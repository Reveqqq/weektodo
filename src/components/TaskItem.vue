```vue
<template>
  <div
    class="task-item"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="task-content">
      <slot></slot>
    </div>
    <div
      v-if="showHoverCard"
      ref="hoverCard"
      class="hover-card"
      :class="{ 'hover-card-bottom': positionBottom }"
      @mouseenter="cancelHide"
      @mouseleave="scheduleHide"
    >
      <slot name="hover-content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    hoverDelay: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      showHoverCard: false,
      positionBottom: false,
      hideTimeout: null,
      cancelHideTimeout: null
    }
  },
  methods: {
    handleMouseEnter() {
      this.cancelHide()
      this.hideTimeout = setTimeout(() => {
        this.showHoverCard = true
        this.$nextTick(() => {
          this.calculatePosition()
        })
      }, this.hoverDelay)
    },
    handleMouseLeave() {
      this.scheduleHide()
    },
    scheduleHide() {
      this.cancelHide()
      this.hideTimeout = setTimeout(() => {
        this.showHoverCard = false
        this.positionBottom = false
      }, 200)
    },
    cancelHide() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout)
        this.hideTimeout = null
      }
    },
    calculatePosition() {
      if (!this.$refs.hoverCard) return

      const cardRect = this.$refs.hoverCard.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const spaceBelow = viewportHeight - cardRect.bottom

      this.positionBottom = spaceBelow < 0
    }
  }
}
</script>

<style scoped>
.task-item {
  position: relative;
  cursor: pointer;
}

.hover-card {
  position: absolute;
  z-index: 10;
  bottom: calc(100% + 8px);
  left: 0;
  min-width: 200px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease;
}

.hover-card-bottom {
  bottom: auto;
  top: calc(100% + 8px);
}
</style>
```