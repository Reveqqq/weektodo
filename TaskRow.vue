```vue
<template>
  <div class="task-wrapper" @mouseenter="handleEnter" @mouseleave="handleLeave">
    <!-- строка задачи -->
    <div class="task-row" ref="reference">
      <slot />
    </div>

    <!-- всплывающая подсказка -->
    <HoverCard
      v-show="isHover"
      ref="cardEl"
      @mouseenter="clearLeaveTimer"
      @mouseleave="scheduleLeave"
    />
  </div>
</template>

<script>
import { ref, nextTick, onBeforeUnmount } from 'vue';
import { createPopper } from '@popperjs/core';
import HoverCard from './HoverCard.vue';
import popperConfig from '@/utils/popperConfig';

export default {
  name: 'TaskRow',
  components: { HoverCard },

  setup() {
    const isHover = ref(false);
    const reference = ref(null);
    const cardEl = ref(null);
    const popperInstance = ref(null);
    const enterTimer = ref(null);
    const leaveTimer = ref(null);

    const scheduleEnter = () => {
      clearTimeout(enterTimer.value);
      enterTimer.value = setTimeout(() => {
        isHover.value = true;
        nextTick(() => {
          if (reference.value && cardEl.value) {
            popperInstance.value = createPopper(
              reference.value,
              cardEl.value,
              popperConfig
            );
          }
        });
      }, 100);
    };

    const scheduleLeave = () => {
      clearTimeout(leaveTimer.value);
      leaveTimer.value = setTimeout(() => {
        isHover.value = false;
        if (popperInstance.value) {
          popperInstance.value.destroy();
          popperInstance.value = null;
        }
      }, 100);
    };

    const handleEnter = () => {
      clearTimeout(leaveTimer.value);
      scheduleEnter();
    };

    const handleLeave = () => {
      clearTimeout(enterTimer.value);
      scheduleLeave();
    };

    const clearLeaveTimer = () => {
      clearTimeout(leaveTimer.value);
    };

    onBeforeUnmount(() => {
      clearTimeout(enterTimer.value);
      clearTimeout(leaveTimer.value);
      if (popperInstance.value) {
        popperInstance.value.destroy();
      }
    });

    return {
      isHover,
      reference,
      cardEl,
      handleEnter,
      handleLeave,
      clearLeaveTimer,
      scheduleLeave,
    };
  },
};
</script>

<style scoped>
.task-wrapper {
  position: relative;
}
.task-row {
  /* стили строки задачи (оставлены из оригинального кода) */
}
</style>
```