```vue
<template>
  <div
    class="task"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="task-content">
      <slot></slot>
    </div>
    <hover-card
      v-if="showHoverCard"
      :style="hoverCardStyle"
      @mouseenter="handleHoverCardEnter"
      @mouseleave="handleHoverCardLeave"
    />
  </div>
</template>

<script>
import HoverCard from './HoverCard.vue'

export default {
  components: { HoverCard },
  data() {
    return {
      showHoverCard: false,
      hoverCardStyle: {}
    }
  },
  methods: {
    handleMouseEnter() {
      this.showHoverCard = true
      this.calculatePosition()
    },
    handleMouseLeave() {
      if (!this.isHoveringCard) {
        this.showHoverCard = false
      }
    },
    handleHoverCardEnter() {
      this.isHoveringCard = true
    },
    handleHoverCardLeave() {
      this.isHoveringCard = false
      this.showHoverCard = false
    },
    calculatePosition() {
      const taskRect = this.$el.getBoundingClientRect()
      const spaceAbove = taskRect.top
      const spaceBelow = window.innerHeight - taskRect.bottom

      this.hoverCardStyle = {
        position: 'absolute',
        left: `${taskRect.left}px`,
        [spaceBelow > spaceAbove ? 'top' : 'bottom']: `${spaceBelow > spaceAbove ? taskRect.bottom : window.innerHeight - taskRect.top}px`,
        'z-index': 1000
      }
    }
  }
}
</script>

<style scoped>
.task {
  position: relative;
  cursor: pointer;
}
.task-content {
  padding: 8px;
}
</style>
```