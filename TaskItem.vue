```vue
<template>
  <div class="task-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="task-item">
      <!-- task content -->
      <slot name="default" />
    </div>

    <HoverCard
      v-if="isHoverCardVisible"
      :task="task"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    />
  </div>
</template>

<script>
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
  data() {
    return {
      isHoverCardVisible: false,
      hideTimeout: null,
    };
  },
  methods: {
    onMouseEnter() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
      this.isHoverCardVisible = true;
    },
    onMouseLeave() {
      this.hideTimeout = setTimeout(() => {
        this.isHoverCardVisible = false;
        this.hideTimeout = null;
      }, 180);
    },
  },
  beforeUnmount() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  },
};
</script>

<style scoped>
.task-wrapper {
  position: relative;
}
</style>
```
