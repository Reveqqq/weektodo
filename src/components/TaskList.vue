```vue
<template>
  <div class="task-list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTaskStore } from '@/store/task';
import TaskItem from '@/components/TaskItem.vue';

const store = useTaskStore();
const tasks = computed(() => store.tasks);
</script>

<style scoped src="./styles/_task-list.scss"></style>
```