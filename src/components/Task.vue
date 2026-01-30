```vue
<template>
  <div class="task-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <!-- Основная часть задачи -->
    <div class="task-item" :class="{ completed: task.completed }">
      <input type="checkbox" v-model="task.completed" @change="toggleComplete" />
      <span class="task-title">{{ task.title }}</span>
      <slot name="actions" />
    </div>

    <!-- Hover‑card -->
    <HoverCard
      v-if="isHoverCardVisible"
      :task="task"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    />
  </div>
</template>

<script>
import HoverCard from './HoverCard.vue';

export default {
  name: 'Task',
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
      hoverHideTimeout: null,
    };
  },
  methods: {
    handleMouseEnter() {
      if (this.hoverHideTimeout) {
        clearTimeout(this.hoverHideTimeout);
        this.hoverHideTimeout = null;
      }
      this.isHoverCardVisible = true;
    },
    handleMouseLeave() {
      // небольшая задержка, чтобы избежать мгновенного скрытия
      this.hoverHideTimeout = setTimeout(() => {
        this.isHoverCardVisible = false;
        this.hoverHideTimeout = null;
      }, 180);
    },
    toggleComplete() {
      this.$emit('update:task', { ...this.task, completed: !this.task.completed });
    },
  },
  beforeDestroy() {
    if (this.hoverHideTimeout) {
      clearTimeout(this.hoverHideTimeout);
    }
  },
};
</script>

<style scoped>
.task-wrapper {
  position: relative;
  display: flex;
  align-items: flex-start;
}

/* При необходимости переопределяем стили карточки */
.task-wrapper > .hover-card {
  pointer-events: auto;
  z-index: 10;
}
</style>
```