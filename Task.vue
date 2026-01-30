```vue
<template>
  <div class="task" @mouseenter="showHoverCard" @mouseleave="hideHoverCard">
    <div class="task-content">
      <!-- Task content here -->
    </div>
    <div v-if="isHoverCardVisible" class="hover-card" @mouseenter="cancelHide" @mouseleave="hideHoverCard">
      <!-- Hover card content here -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHoverCardVisible: false,
      hideTimeout: null
    }
  },
  methods: {
    showHoverCard() {
      clearTimeout(this.hideTimeout)
      this.isHoverCardVisible = true
    },
    hideHoverCard() {
      this.hideTimeout = setTimeout(() => {
        this.isHoverCardVisible = false
      }, 200)
    },
    cancelHide() {
      clearTimeout(this.hideTimeout)
    }
  }
}
</script>

<style scoped>
.task {
  position: relative;
}

.hover-card {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
}
</style>
```