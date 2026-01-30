```vue
<template>
  <tr
    class="task-row"
    @mouseenter="onRowEnter"
    @mouseleave="onRowLeave"
  >
    <!-- task columns -->
    <td class="task-title">{{ task.title }}</td>
    <td class="task-assignee">{{ task.assignee }}</td>
    <td class="task-due">{{ task.due | formatDate }}</td>

    <!-- hover card, rendered inside the row -->
    <HoverCard
      v-if="isHover"
      :task="task"
      class="task-hover-card"
      @mouseenter="clearHoverTimeout"
      @mouseleave="scheduleHide"
    />
  </tr>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue';
import HoverCard from '@/components/HoverCard.vue';

export default {
  name: 'TaskRow',
  components: { HoverCard },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const isHover = ref(false);
    let hideTimeout = null;

    const onRowEnter = () => {
      clearHoverTimeout();
      isHover.value = true;
    };

    const onRowLeave = () => {
      scheduleHide();
    };

    const clearHoverTimeout = () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
    };

    const scheduleHide = () => {
      clearHoverTimeout();
      hideTimeout = setTimeout(() => {
        isHover.value = false;
        hideTimeout = null;
      }, 150);
    };

    onBeforeUnmount(() => {
      clearHoverTimeout();
    });

    return {
      isHover,
      onRowEnter,
      onRowLeave,
      clearHoverTimeout,
      scheduleHide,
    };
  },
};
</script>

<style scoped>
.task-row {
  position: relative;
}

/* ensure the hover card can receive pointer events */
.task-hover-card {
  pointer-events: auto;
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 2px; /* small gap to avoid accidental mouseleave */
  z-index: 10;
}
</style>
```