```vue
<template>
  <div class="task-item" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <slot></slot>
    <hover-card
      v-if="showHoverCard"
      :task="task"
      :position="hoverCardPosition"
      @mouseenter="handleCardMouseEnter"
      @mouseleave="handleCardMouseLeave"
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
      hoverCardPosition: 'bottom',
      hoverTimeout: null
    }
  },
  methods: {
    handleMouseEnter(event) {
      clearTimeout(this.hoverTimeout)
      this.hoverTimeout = setTimeout(() => {
        this.showHoverCard = true
        this.calculatePosition(event)
      }, 200)
    },
    handleMouseLeave(event) {
      if (!event.relatedTarget || !this.$el.contains(event.relatedTarget)) {
        clearTimeout(this.hoverTimeout)
        this.hoverTimeout = setTimeout(() => {
          this.showHoverCard = false
        }, 300)
      }
    },
    handleCardMouseEnter() {
      clearTimeout(this.hoverTimeout)
    },
    handleCardMouseLeave() {
      this.hoverTimeout = setTimeout(() => {
        this.showHoverCard = false
      }, 300)
    },
    calculatePosition(event) {
      const rect = this.$el.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      
      this.hoverCardPosition = spaceBelow > spaceAbove ? 'bottom' : 'top'
    }
  },
  beforeDestroy() {
    clearTimeout(this.hoverTimeout)
  }
}
</script>

<style scoped>
.task-item {
  position: relative;
}
</style>
```