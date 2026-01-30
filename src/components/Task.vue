```vue
<template>
  <div class="task" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="task-content">
      <slot></slot>
    </div>
    <div v-if="showHoverCard" class="hover-card" ref="hoverCard">
      <slot name="hover-content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  data() {
    return {
      showHoverCard: false,
      hoverTimeout: null
    }
  },
  methods: {
    handleMouseEnter() {
      clearTimeout(this.hoverTimeout)
      this.showHoverCard = true
    },
    handleMouseLeave() {
      this.hoverTimeout = setTimeout(() => {
        this.showHoverCard = false
      }, 200)
    }
  },
  beforeDestroy() {
    clearTimeout(this.hoverTimeout)
  }
}
</script>

<style scoped>
.task {
  position: relative;
  display: inline-block;
}

.hover-card {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  min-width: 200px;
  padding: 8px;
  background: white;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
```