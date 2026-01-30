```vue
<template>
  <div
    class="task-item"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="task-content">
      {{ task.title }}
    </div>

    <HoverCard
      v-if="showHover"
      :task="task"
      @mouseenter.stop="keepHover"
      @mouseleave.stop="onMouseLeave"
    />
  </div>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue';
import HoverCard from './HoverCard.vue';

export default {
  name: 'TaskItem',
  components: { HoverCard },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const showHover = ref(false);
    let hideTimeout = null;

    const clearHideTimeout = () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
    };

    const onMouseEnter = () => {
      clearHideTimeout();
      showHover.value = true;
    };

    const onMouseLeave = () => {
      clearHideTimeout();
      hideTimeout = setTimeout(() => {
        showHover.value = false;
        hideTimeout = null;
      }, 150);
    };

    const keepHover = () => {
      clearHideTimeout();
    };

    onBeforeUnmount(() => {
      clearHideTimeout();
    });

    return {
      showHover,
      onMouseEnter,
      onMouseLeave,
      keepHover,
    };
  },
};
</script>

<style scoped>
.task-item {
  position: relative;
}
</style>
```