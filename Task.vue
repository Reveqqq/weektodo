```vue
<template>
  <div class="task" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="task-content">
      <!-- Task content here -->
    </div>
    <div 
      class="hover-card" 
      :class="{'hover-card--top': position === 'top', 'hover-card--bottom': position === 'bottom'}"
      @mouseenter="isHoveringCard = true"
      @mouseleave="isHoveringCard = false"
      v-show="isHovering"
      ref="hoverCard"
    >
      <!-- Hover card content here -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHovering: false,
      isHoveringCard: false,
      position: 'bottom'
    }
  },
  methods: {
    handleMouseEnter() {
      this.isHovering = true
      this.calculatePosition()
    },
    handleMouseLeave() {
      setTimeout(() => {
        if (!this.isHoveringCard) {
          this.isHovering = false
        }
      }, 100)
    },
    calculatePosition() {
      const rect = this.$el.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      this.position = spaceBelow > spaceAbove ? 'bottom' : 'top'
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  position: relative;
  cursor: pointer;

  &:hover .hover-card {
    opacity: 1;
    visibility: visible;
  }
}

.hover-card {
  position: absolute;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;

  &--top {
    bottom: calc(100% + 8px);
  }

  &--bottom {
    top: calc(100% + 8px);
  }
}
</style>
```