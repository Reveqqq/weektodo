```vue
<template>
  <div class="tasks-list">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="task-wrapper"
      @mouseenter="handleMouseEnter(task)"
      @mouseleave="handleMouseLeave"
    >
      <Task
        :task="task"
        :show-hover-card="activeTaskId === task.id"
        @hover-card-mouseenter="handleHoverCardEnter"
        @hover-card-mouseleave="handleHoverCardLeave"
      />
    </div>
  </div>
</template>

<script>
import Task from './Task/Task.vue'

export default {
  name: 'TasksList',
  components: { Task },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeTaskId: null,
      hoverCardTimeout: null,
      isHoveringCard: false
    }
  },
  methods: {
    handleMouseEnter(task) {
      clearTimeout(this.hoverCardTimeout)
      this.activeTaskId = task.id
    },
    handleMouseLeave() {
      if (!this.isHoveringCard) {
        this.hoverCardTimeout = setTimeout(() => {
          this.activeTaskId = null
        }, 200)
      }
    },
    handleHoverCardEnter() {
      clearTimeout(this.hoverCardTimeout)
      this.isHoveringCard = true
    },
    handleHoverCardLeave() {
      this.isHoveringCard = false
      this.hoverCardTimeout = setTimeout(() => {
        this.activeTaskId = null
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-wrapper {
  position: relative;
  padding: 4px;
  margin: -4px;
}
</style>
```