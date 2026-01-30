```vue
<template>
  <div class="task-list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @hover="handleTaskHover"
      @leave="handleTaskLeave"
    />
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue'

export default {
  components: { TaskItem },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleTaskHover(task) {
      this.$emit('hover', task)
    },
    handleTaskLeave() {
      this.$emit('leave')
    }
  }
}
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}
</style>
```