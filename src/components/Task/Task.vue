```vue
<template>
  <div class="task" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="task-content">
      <!-- Task content here -->
    </div>
    <div 
      class="hover-card" 
      :class="{ 'hover-card--top': isTopPositioned }"
      v-show="isHovered"
      @mouseenter="handleCardMouseEnter"
      @mouseleave="handleCardMouseLeave"
    >
      <!-- Hover card content here -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHovered: false,
      isTopPositioned: false,
      hoverTimeout: null
    }
  },
  methods: {
    handleMouseEnter() {
      clearTimeout(this.hoverTimeout)
      this.isHovered = true
      this.calculatePosition()
    },
    handleMouseLeave() {
      this.hoverTimeout = setTimeout(() => {
        if (!this.isCardHovered) {
          this.isHovered = false
        }
      }, 100)
    },
    handleCardMouseEnter() {
      clearTimeout(this.hoverTimeout)
      this.isCardHovered = true
    },
    handleCardMouseLeave() {
      this.isCardHovered = false
      this.isHovered = false
    },
    calculatePosition() {
      const rect = this.$el.getBoundingClientRect()
      this.isTopPositioned = rect.top > window.innerHeight / 2
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  position: relative;
  cursor: pointer;

  &:hover {
    .hover-card {
      opacity: 1;
      pointer-events: auto;
    }
  }
}

.hover-card {
  position: absolute;
  z-index: 10;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  margin-top: 8px;

  &--top {
    bottom: 100%;
    margin-top: 0;
    margin-bottom: 8px;
  }
}
</style>
```