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
  data() {
    return {
      showHoverCard: false,
      hideTimeout: null,
      hoverCardWidth: 300
    }
  },
  methods: {
    handleMouseEnter() {
      clearTimeout(this.hideTimeout)
      this.showHoverCard = true
      this.$nextTick(() => {
        this.positionHoverCard()
      })
    },
    handleMouseLeave() {
      this.scheduleHide()
    },
    scheduleHide() {
      this.hideTimeout = setTimeout(() => {
        this.showHoverCard = false
      }, 200)
    },
    cancelHide() {
      clearTimeout(this.hideTimeout)
    },
    positionHoverCard() {
      if (!this.$refs.hoverCard) return
      
      const taskRect = this.$el.getBoundingClientRect()
      const hoverCard = this.$refs.hoverCard
      
      let top = taskRect.bottom + window.scrollY
      let left = taskRect.left + window.scrollX
      
      // Проверка на выход за правую границу экрана
      if (left + this.hoverCardWidth > window.innerWidth) {
        left = window.innerWidth - this.hoverCardWidth - 10
      }
      
      // Проверка на выход за нижнюю границу экрана
      if (top + hoverCard.offsetHeight > window.innerHeight + window.scrollY) {
        top = taskRect.top + window.scrollY - hoverCard.offsetHeight
      }
      
      hoverCard.style.top = `${top}px`
      hoverCard.style.left = `${left}px`
    }
  }
}
</script>

<style scoped>
.task-item {
  position: relative;
  display: inline-block;
}

.hover-card {
  position: absolute;
  z-index: 1000;
  pointer-events: auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-width: 200px;
}
</style>
```