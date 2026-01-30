```vue
<template>
  <tr
    class="task-row"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- task columns -->
    <td class="task-title">{{ task.title }}</td>
    <td class="task-assignee">{{ task.assignee }}</td>
    <td class="task-status">{{ task.status }}</td>

    <!-- Hover card placed inside the row -->
    <HoverCard
      v-if="isHover"
      :task="task"
      @mouseenter.stop="keepHover"
      @mouseleave.stop="scheduleHide"
    />
  </tr>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import HoverCard from '@/components/HoverCard.vue';

defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const isHover = ref(false);
let hideTimeout = null;
const HIDE_DELAY = 150;

function clearHideTimeout() {
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
}

function onMouseEnter() {
  clearHideTimeout();
  isHover.value = true;
}

function onMouseLeave() {
  scheduleHide();
}

function keepHover() {
  clearHideTimeout();
  isHover.value = true;
}

function scheduleHide() {
  clearHideTimeout();
  hideTimeout = setTimeout(() => {
    isHover.value = false;
    hideTimeout = null;
  }, HIDE_DELAY);
}

onBeforeUnmount(() => {
  clearHideTimeout();
});
</script>

<style scoped>
.task-row {
  position: relative;
}
</style>
```