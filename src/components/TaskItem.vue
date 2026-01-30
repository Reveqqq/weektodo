```vue
<template>
  <div
    class="task-item"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="task-content">
      <slot></slot>
    </div>
    
    <TaskHoverCard
      v-if="showHoverCard"
      @mouseenter="onHoverCardEnter"
      @mouseleave="onMouseLeave"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import TaskHoverCard from './TaskHoverCard.vue';

export default {
  components: {
    TaskHoverCard
  },
  setup() {
    const showHoverCard = ref(false);
    let hideTimeout;

    function onMouseEnter() {
      clearTimeout(hideTimeout);
      showHoverCard.value = true;
    }

    function onMouseLeave() {
      hideTimeout = setTimeout(() => {
        showHoverCard.value = false;
      }, 500);
    }

    function onHoverCardEnter() {
      clearTimeout(hideTimeout);
    }

    return {
      showHoverCard,
      onMouseEnter,
      onMouseLeave,
      onHoverCardEnter
    };
  }
};
</script>

<style scoped>
.task-item {
  position: relative;
}
</style>
```