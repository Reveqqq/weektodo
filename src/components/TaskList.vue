```vue
<template>
  <div class="task-list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @hover="handleTaskHover"
    />
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue'

export default {
  components: {
    TaskItem
  },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleTaskHover(task) {
      this.$emit('hover', task)
    }
  }
}
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```