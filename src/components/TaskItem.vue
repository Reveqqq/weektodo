```vue
<template>
  <div
    class="task-item"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="taskItem"
  >
    <div class="task-content">
      <slot></slot>
    </div>
    <div
      v-if="showHoverCard"
      class="hover-card"
      :class="hoverCardPosition"
      @mouseenter="handleHoverCardEnter"
      @mouseleave="handleHoverCardLeave"
      ref="hoverCard"
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
      hoverCardPosition: 'bottom',
      hoverTimeout: null,
      isHoveringCard: false
    }
  },
  methods: {
    handleMouseEnter() {
      clearTimeout(this.hoverTimeout)
      this.calculatePosition()
      this.showHoverCard = true
      this.isHoveringCard = false
    },
    handleMouseLeave() {
      this.hoverTimeout = setTimeout(() => {
        if (!this.isHoveringCard) {
          this.showHoverCard = false
        }
      }, 200)
    },
    handleHoverCardEnter() {
      clearTimeout(this.hoverTimeout)
      this.isHoveringCard = true
    },
    handleHoverCardLeave() {
      this.isHoveringCard = false
      this.showHoverCard = false
    },
    calculatePosition() {
      const rect = this.$refs.taskItem.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      this.hoverCardPosition = spaceBelow > spaceAbove ? 'bottom' : 'top'
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
  left: 0;
  z-index: 10;
  width: 100%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.hover-card.bottom {
  top: calc(100% + 8px);
}

.hover-card.top {
  bottom: calc(100% + 8px);
}
</style>
```