```vue
<template>
  <div class="task-list">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="task-row"
      @mouseenter="onRowEnter(task.id)"
      @mouseleave="onRowLeave(task.id)"
    >
      <TaskItem :task="task" />

      <!-- Hover card is rendered inside the same DOM‑tree as the row -->
      <HoverCard
        v-if="hoveredTaskId === task.id"
        :task="task"
        @mouseenter.stop="keepHover"
        @mouseleave.stop="scheduleHide"
      />
    </div>
  </div>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue';
import TaskItem from '@/components/TaskItem.vue';
import HoverCard from '@/components/HoverCard.vue';

export default {
  name: 'TaskList',
  components: { TaskItem, HoverCard },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const hoveredTaskId = ref(null);
    let hideTimeout = null;
    const HIDE_DELAY = 150;

    const clearHideTimeout = () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
    };

    const onRowEnter = (id) => {
      clearHideTimeout();
      hoveredTaskId.value = id;
    };

    const onRowLeave = (id) => {
      // start delayed hide; if mouse moves to the card,
      // keepHover will clear this timeout
      scheduleHide();
    };

    const keepHover = () => {
      clearHideTimeout();
    };

    const scheduleHide = () => {
      clearHideTimeout();
      hideTimeout = setTimeout(() => {
        hoveredTaskId.value = null;
        hideTimeout = null;
      }, HIDE_DELAY);
    };

    onBeforeUnmount(() => {
      clearHideTimeout();
    });

    return {
      hoveredTaskId,
      onRowEnter,
      onRowLeave,
      keepHover,
      scheduleHide,
    };
  },
};
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
}

.task-row {
  position: relative;
  /* optional spacing between rows */
  margin-bottom: 4px;
}

/* ensure the hover‑card can receive pointer events */
.task-row :deep(.hover-card) {
  pointer-events: auto;
}
</style>
```