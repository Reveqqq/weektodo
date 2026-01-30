```vue
<template>
  <div
    class="task-wrapper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Основная строка задачи -->
    <div class="task-row">
      <slot name="default" :task="task" />
    </div>

    <!-- Карточка подсказки -->
    <HoverCard
      v-if="isHover"
      :task="task"
      @mouseenter="clearLeaveTimer"
      @mouseleave="scheduleLeave"
    />
  </div>
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
let enterTimer = null;
let leaveTimer = null;
const ENTER_DELAY = 100;
const LEAVE_DELAY = 100;

function clearEnterTimer() {
  if (enterTimer) {
    clearTimeout(enterTimer);
    enterTimer = null;
  }
}

function clearLeaveTimer() {
  if (leaveTimer) {
    clearTimeout(leaveTimer);
    leaveTimer = null;
  }
}

function handleMouseEnter() {
  clearLeaveTimer();
  clearEnterTimer();
  enterTimer = setTimeout(() => {
    isHover.value = true;
    enterTimer = null;
  }, ENTER_DELAY);
}

function scheduleLeave() {
  clearEnterTimer();
  clearLeaveTimer();
  leaveTimer = setTimeout(() => {
    isHover.value = false;
    leaveTimer = null;
  }, LEAVE_DELAY);
}

function handleMouseLeave() {
  scheduleLeave();
}

onBeforeUnmount(() => {
  clearEnterTimer();
  clearLeaveTimer();
});
</script>

<style scoped>
.task-wrapper {
  position: relative;
  /* гарантируем, что карточка будет над строками списка */
  z-index: 10;
}

/* Если в проекте используется глобальная стилизация строки,
   здесь можно добавить дополнительные отступы, чтобы
   курсор мог «перепрыгнуть» в карточку без перехода
   на соседний элемент. */
.task-row {
  pointer-events: auto;
}
</style>
```