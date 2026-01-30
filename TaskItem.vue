```vue
<template>
  <div 
    class="task-item"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="task-content">
      <!-- Task content here -->
    </div>

    <div
      v-if="showHoverCard"
      class="hover-card"
      :class="{ 'hover-card-top': showOnTop }"
      @mouseenter="cancelHide"
      @mouseleave="hideHoverCard"
    >
      <!-- Hover card content here -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHoverCard: false,
      showOnTop: false,
      hideTimeout: null
    }
  },
  methods: {
    handleMouseEnter() {
      clearTimeout(this.hideTimeout)
      this.calculatePosition()
      this.showHoverCard = true
    },
    handleMouseLeave() {
      this.hideTimeout = setTimeout(() => {
        this.showHoverCard = false
      }, 200)
    },
    cancelHide() {
      clearTimeout(this.hideTimeout)
    },
    hideHoverCard() {
      this.hideTimeout = setTimeout(() => {
        this.showHoverCard = false
      }, 200)
    },
    calculatePosition() {
      const rect = this.$el.getBoundingClientRect()
      this.showOnTop = rect.bottom + 200 > window.innerHeight
    }
  }
}
</script>

<style scoped>
.task-item {
  position: relative;
  padding-bottom: 8px;
}

.hover-card {
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 10;
  pointer-events: auto;
}

.hover-card-top {
  bottom: calc(100% + 8px);
}

.hover-card:not(.hover-card-top) {
  top: calc(100% + 8px);
}
</style>
```