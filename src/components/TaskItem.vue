```vue
<template>
  <div
    class="task-wrapper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Основная строка задачи -->
    <div class="task-item">
      <slot name="default" />
    </div>

    <!-- Hover‑card -->
    <HoverCard
      v-if="isHoverVisible"
      :task="task"
      @mouseenter="handleCardEnter"
      @mouseleave="handleCardLeave"
    />
  </div>
</template>

<script>
import HoverCard from '@/components/HoverCard.vue'

export default {
  name: 'TaskItem',
  components: { HoverCard },
  props: {
    /** Данные задачи, передаются в HoverCard */
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      /** Видимость hover‑card */
      isHoverVisible: false,
      /** ID тайм‑аута, используемого для задержки скрытия */
      hideTimeoutId: null,
      /** Длительность задержки перед скрытием (мс) */
      hideDelay: 180,
    }
  },
  methods: {
    /** Очистить текущий тайм‑аут, если он есть */
    clearHideTimeout() {
      if (this.hideTimeoutId !== null) {
        clearTimeout(this.hideTimeoutId)
        this.hideTimeoutId = null
      }
    },

    /** Обработчик входа курсора в обёртку задачи */
    handleMouseEnter() {
      this.clearHideTimeout()
      this.isHoverVisible = true
    },

    /** Обработчик выхода курсора из обёртки задачи */
    handleMouseLeave() {
      this.scheduleHide()
    },

    /** Обработчик входа курсора в hover‑card */
    handleCardEnter() {
      this.clearHideTimeout()
    },

    /** Обработчик выхода курсора из hover‑card */
    handleCardLeave() {
      this.scheduleHide()
    },

    /** Запланировать скрытие hover‑card с задержкой */
    scheduleHide() {
      this.clearHideTimeout()
      this.hideTimeoutId = setTimeout(() => {
        this.isHoverVisible = false
        this.hideTimeoutId = null
      }, this.hideDelay)
    },
  },
  beforeUnmount() {
    this.clearHideTimeout()
  },
}
</script>

<style scoped>
.task-wrapper {
  position: relative;
}
.task-item {
  /* стили строки задачи – оставляем как есть */
}
</style>
```