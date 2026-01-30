```vue
<template>
  <div
    class="task-item"
    ref="taskRef"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot />

    <HoverCard
      v-if="showHover"
      :task="task"
      :reference-el="taskRef"
      @card-enter="onCardEnter"
      @card-leave="onCardLeave"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import HoverCard from './HoverCard.vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const showHover = ref(false);
const hideTimeout = ref(null);
const taskRef = ref(null);

function clearHide() {
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value);
    hideTimeout.value = null;
  }
}

function scheduleHide() {
  clearHide();
  hideTimeout.value = setTimeout(() => {
    showHover.value = false;
    hideTimeout.value = null;
  }, 200);
}

function onMouseEnter() {
  clearHide();
  showHover.value = true;
}

function onMouseLeave() {
  scheduleHide();
}

function onCardEnter() {
  clearHide();
}

function onCardLeave() {
  scheduleHide();
}

onBeforeUnmount(() => {
  clearHide();
});
</script>

<style scoped>
.task-item {
  position: relative;
}
</style>
```