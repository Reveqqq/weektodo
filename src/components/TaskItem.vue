```vue
<template>
  <div
    class="task-wrapper"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    ref="wrapperRef"
  >
    <div class="task-row" ref="taskRef">
      <!-- original task row content -->
      <slot />
    </div>

    <HoverCard
      v-if="hoverVisible"
      :reference-element="taskRef"
      :visible="isHover"
      @mouseenter="clearLeaveTimer"
      @mouseleave="scheduleLeave"
      ref="cardRef"
    />
  </div>
</template>

<script>
import { ref, watch, onBeforeUnmount } from 'vue';
import { createPopper } from '@popperjs/core';
import HoverCard from './HoverCard.vue';

export default {
  name: 'TaskItem',
  components: { HoverCard },
  setup() {
    const isHover = ref(false);
    const enterTimer = ref(null);
    const leaveTimer = ref(null);
    const wrapperRef = ref(null);
    const taskRef = ref(null);
    const cardRef = ref(null);
    let popperInstance = null;

    const onEnter = () => {
      clearTimeout(leaveTimer.value);
      if (!enterTimer.value) {
        enterTimer.value = setTimeout(() => {
          isHover.value = true;
          enterTimer.value = null;
        }, 100);
      }
    };

    const onLeave = () => {
      clearTimeout(enterTimer.value);
      scheduleLeave();
    };

    const clearLeaveTimer = () => {
      clearTimeout(leaveTimer.value);
    };

    const scheduleLeave = () => {
      if (!leaveTimer.value) {
        leaveTimer.value = setTimeout(() => {
          isHover.value = false;
          leaveTimer.value = null;
        }, 100);
      }
    };

    const initPopper = () => {
      if (taskRef.value && cardRef.value) {
        popperInstance = createPopper(taskRef.value, cardRef.value.$el, {
          placement: 'bottom',
          modifiers: [
            {
              name: 'offset',
              options: { offset: [0, 4] },
            },
            {
              name: 'preventOverflow',
              options: { padding: 8 },
            },
            {
              name: 'flip',
              options: { fallbackPlacements: ['top', 'right', 'left'] },
            },
          ],
        });
      }
    };

    const destroyPopper = () => {
      if (popperInstance) {
        popperInstance.destroy();
        popperInstance = null;
      }
    };

    watch(isHover, (newVal) => {
      if (newVal) {
        initPopper();
      } else {
        destroyPopper();
      }
    });

    onBeforeUnmount(() => {
      clearTimeout(enterTimer.value);
      clearTimeout(leaveTimer.value);
      destroyPopper();
    });

    return {
      wrapperRef,
      taskRef,
      cardRef,
      isHover,
      hoverVisible: isHover,
      onEnter,
      onLeave,
      clearLeaveTimer,
      scheduleLeave,
    };
  },
};
</script>

<style scoped>
.task-wrapper {
  position: relative;
  z-index: 10;
}
.task-row {
  /* existing row styles */
}
</style>
```