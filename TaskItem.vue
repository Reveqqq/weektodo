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
      :class="{'hover-card--bottom': positionBottom}"
      :style="hoverCardStyle"
      ref="hoverCard"
      @mouseenter="handleCardMouseEnter"
      @mouseleave="handleCardMouseLeave"
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
      hoverCardStyle: {},
      hoverTimeout: null,
      isHoveringCard: false
    }
  },
  methods: {
    handleMouseEnter() {
      this.hoverTimeout = setTimeout(() => {
        this.calculatePosition();
        this.showHoverCard = true;
      }, this.hoverDelay);
    },
    handleMouseLeave() {
      clearTimeout(this.hoverTimeout);
      if (!this.isHoveringCard) {
        this.showHoverCard = false;
      }
    },
    handleCardMouseEnter() {
      this.isHoveringCard = true;
    },
    handleCardMouseLeave() {
      this.isHoveringCard = false;
      this.showHoverCard = false;
    },
    calculatePosition() {
      if (!this.$refs.taskItem || !this.$refs.hoverCard) return;

      const taskRect = this.$refs.taskItem.getBoundingClientRect();
      const hoverHeight = 200; // Approximate hover card height
      const spaceBelow = window.innerHeight - taskRect.bottom;
      
      this.positionBottom = spaceBelow < hoverHeight && taskRect.top > hoverHeight;
      
      this.hoverCardStyle = {
        left: `${taskRect.left}px`,
        top: this.positionBottom 
          ? `${taskRect.top - hoverHeight - 10}px`
          : `${taskRect.bottom + 10}px`
      };
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
  position: fixed;
  z-index: 1000;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: opacity 0.2s ease;
}

.hover-card--bottom {
  top: auto;
  bottom: calc(100% + 10px);
}
</style>
```