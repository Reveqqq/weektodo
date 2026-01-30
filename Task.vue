```vue
<template>
  <div
    class="task"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="taskElement"
  >
    <slot></slot>
    <HoverCard
      v-if="showHoverCard"
      :task="task"
      :style="hoverCardStyle"
      @mouseenter="handleCardEnter"
      @mouseleave="handleCardLeave"
    />
  </div>
</template>

<script>
import HoverCard from './HoverCard.vue'

export default {
  components: { HoverCard },
  props: {
    task: Object
  },
  data() {
    return {
      showHoverCard: false,
      hoverCardStyle: {},
      isHovering: false
    }
  },
  methods: {
    handleMouseEnter() {
      this.isHovering = true
      this.showHoverCard = true
      this.calculatePosition()
    },
    handleMouseLeave() {
      this.isHovering = false
      setTimeout(() => {
        if (!this.isHovering && !this.isCardHovered) {
          this.showHoverCard = false
        }
      }, 100)
    },
    handleCardEnter() {
      this.isCardHovered = true
    },
    handleCardLeave() {
      this.isCardHovered = false
      setTimeout(() => {
        if (!this.isHovering && !this.isCardHovered) {
          this.showHoverCard = false
        }
      }, 100)
    },
    calculatePosition() {
      const taskRect = this.$refs.taskElement.getBoundingClientRect()
      const spaceBelow = window.innerHeight - taskRect.bottom
      const spaceAbove = taskRect.top

      this.hoverCardStyle = {
        position: 'absolute',
        left: `${taskRect.left}px`,
        zIndex: 1000,
        ...(spaceBelow > 200 || spaceBelow > spaceAbove
          ? { top: `${taskRect.bottom}px` }
          : { bottom: `${window.innerHeight - taskRect.top}px` })
      }
    }
  }
}
</script>

<style scoped>
.task {
  position: relative;
  display: inline-block;
}
</style>
```