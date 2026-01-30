```vue
<template>
  <div class="task-item" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="task-content">
      <slot></slot>
    </div>
    <div 
      v-if="showHoverCard" 
      class="hover-card" 
      :class="{ 'hover-card-bottom': showBelow }"
      @mouseenter="handleCardEnter"
      @mouseleave="handleCardLeave"
    >
      <slot name="hover-content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskItem',
  data() {
    return {
      showHoverCard: false,
      showBelow: false,
      hoverTimeout: null,
      isHoveringCard: false
    }
  },
  methods: {
    handleMouseEnter() {
      clearTimeout(this.hoverTimeout)
      this.showBelow = this.checkPosition()
      this.hoverTimeout = setTimeout(() => {
        this.showHoverCard = true
      }, 200)
    },
    handleMouseLeave() {
      this.hoverTimeout = setTimeout(() => {
        if (!this.isHoveringCard) {
          this.showHoverCard = false
        }
      }, 300)
    },
    handleCardEnter() {
      clearTimeout(this.hoverTimeout)
      this.isHoveringCard = true
    },
    handleCardLeave() {
      this.isHoveringCard = false
      this.hoverTimeout = setTimeout(() => {
        this.showHoverCard = false
      }, 200)
    },
    checkPosition() {
      const rect = this.$el.getBoundingClientRect()
      return rect.bottom + 200 > window.innerHeight
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
  left: 0;
  top: 100%;
  margin-top: 8px;
  pointer-events: auto;
}

.hover-card-bottom {
  top: auto;
  bottom: 100%;
  margin-top: 0;
  margin-bottom: 8px;
}
</style>
```