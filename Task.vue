```vue
<template>
  <div
    class="task"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="taskRef"
  >
    <div class="task-content">
      <slot></slot>
    </div>
    
    <HoverCard
      v-if="showHoverCard"
      :target-element="taskRef"
      @mouseenter="handleCardEnter"
      @mouseleave="handleCardLeave"
    />
  </div>
</template>

<script>
import HoverCard from '@/components/HoverCard/HoverCard.vue'

export default {
  components: {
    HoverCard
  },
  data() {
    return {
      showHoverCard: false,
      hoverTimeout: null,
      taskRef: null
    }
  },
  methods: {
    handleMouseEnter() {
      clearTimeout(this.hoverTimeout)
      this.showHoverCard = true
    },
    handleMouseLeave() {
      this.hoverTimeout = setTimeout(() => {
        if (!this.isHoveringCard) {
          this.showHoverCard = false
        }
      }, 200)
    },
    handleCardEnter() {
      this.isHoveringCard = true
      clearTimeout(this.hoverTimeout)
    },
    handleCardLeave() {
      this.isHoveringCard = false
      this.handleMouseLeave()
    }
  },
  mounted() {
    this.taskRef = this.$refs.taskRef
  }
}
</script>

<style lang="scss" scoped>
.task {
  position: relative;
  padding: 8px;
  margin: 4px 0;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  
  &-content {
    position: relative;
    z-index: 1;
  }
}
</style>
```