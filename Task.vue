```vue
<template>
  <div
    class="task-wrapper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Основная часть задачи -->
    <div class="task-item">
      <slot name="content">
        {{ task.title }}
      </slot>
    </div>

    <!-- Ховер‑карта -->
    <HoverCard
      v-if="isHoverCardVisible"
      :task="task"
      @close="isHoverCardVisible = false"
    />
  </div>
</template>

<script>
import HoverCard from '@/components/HoverCard.vue'

export default {
  name: 'Task',
  components: { HoverCard },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isHoverCardVisible: false,
      hideTimeoutId: null
    }
  },
  methods: {
    handleMouseEnter() {
      if (this.hideTimeoutId) {
        clearTimeout(this.hideTimeoutId)
        this.hideTimeoutId = null
      }
      this.isHoverCardVisible = true
    },
    handleMouseLeave() {
      this.hideTimeoutId = setTimeout(() => {
        this.isHoverCardVisible = false
        this.hideTimeoutId = null
      }, 180)
    }
  },
  beforeUnmount() {
    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId)
    }
  }
}
</script>

<style scoped>
.task-wrapper {
  position: relative;
}
</style>
```