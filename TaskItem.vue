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
    
    <HoverCard
      v-if="showHoverCard"
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
  components: { HoverCard },
  props: {
    task: Object
  },
  data() {
    return {
      showHoverCard: false,
      hoverCardTimeout: null,
      isHoveringCard: false
    }
  },
  computed: {
    hoverCardStyle() {
      return {
        position: 'absolute',
        bottom: '100%',
        left: '0',
        zIndex: 10
      }
    }
  },
  methods: {
    handleMouseEnter() {
      this.hoverCardTimeout = setTimeout(() => {
        this.showHoverCard = true
      }, 200)
    },
    handleMouseLeave() {
      clearTimeout(this.hoverCardTimeout)
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
    }
  }
}
</script>

<style scoped>
.task-item {
  position: relative;
  padding: 8px 12px;
}

.task-content {
  cursor: pointer;
}
</style>
```