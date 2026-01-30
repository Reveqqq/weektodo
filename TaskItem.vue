Вот обновленный код `TaskItem.vue` с модификациями hover-логики:

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
      class="hover-card"
      ref="hoverCard"
      @mouseenter="cancelHide"
      @mouseleave="scheduleHide"
    >
      <slot name="hover-content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHoverCard: false,
      hideTimeout: null,
      hoverCardHeight: 0
    }
  },
  methods: {
    handleMouseEnter() {
      clearTimeout(this.hideTimeout)
      this.showHoverCard = true
      this.$nextTick(() => {
        this.calculateCardHeight()
      })
    },
    handleMouseLeave() {
      this.scheduleHide()
    },
    scheduleHide() {
      this.hideTimeout = setTimeout(() => {
        this.showHoverCard = false
      }, 300)
    },
    cancelHide() {
      clearTimeout(this.hideTimeout)
    },
    calculateCardHeight() {
      if (this.$refs.hoverCard) {
        this.hoverCardHeight = this.$refs.hoverCard.offsetHeight
      }
    }
  }
}
</script>

<style scoped>
.task-item {
  position: relative;
}

.hover-card {
  position: absolute;
  z-index: 10;
  width: 100%;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-top: 4px;
}

.task-item:hover .hover-card {
  display: block;
}
</style>
```