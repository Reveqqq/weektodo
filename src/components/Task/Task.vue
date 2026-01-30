Вот обновленный код файла `Task.vue`:

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
    
    <HoverCard
      v-if="showHoverCard"
      ref="hoverCard"
      :task="task"
      :style="hoverCardStyle"
      @mouseenter="handleHoverCardEnter"
      @mouseleave="handleHoverCardLeave"
    />
  </div>
</template>

<script>
import HoverCard from './HoverCard.vue'

export default {
  components: {
    HoverCard
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showHoverCard: false,
      hoverCardStyle: {},
      hoverTimeout: null
    }
  },
  methods: {
    handleMouseEnter() {
      clearTimeout(this.hoverTimeout)
      this.showHoverCard = true
      this.$nextTick(() => {
        this.calculateHoverCardPosition()
      })
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
    calculateHoverCardPosition() {
      if (!this.$refs.hoverCard) return
      
      const taskRect = this.$el.getBoundingClientRect()
      const hoverCardRect = this.$refs.hoverCard.$el.getBoundingClientRect()
      
      this.hoverCardStyle = {
        top: `${taskRect.bottom + window.scrollY + 5}px`,
        left: `${taskRect.left + window.scrollX}px`,
        width: `${taskRect.width}px`
      }
    }
  }
}
</script>

<style scoped>
.task {
  position: relative;
  padding: 8px;
  margin: 4px 0;
}

.task-content {
  position: relative;
  z-index: 1;
}
</style>
```