```vue
<template>
  <div class="task" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
    <div class="task-content">
      <input type="checkbox" v-model="task.completed" @click.stop />
      <span>{{ task.title }}</span>
    </div>
    <HoverCard
      v-if="showHoverCard"
      :task="task"
      @mouseenter="cancelHide"
      @mouseleave="scheduleHide"
    />
  </div>
</template>

<script>
import HoverCard from './HoverCard.vue'
import { debounce } from 'lodash'

export default {
  components: { HoverCard },
  props: {
    task: { type: Object, required: true }
  },
  data() {
    return {
      showHoverCard: false,
      hideDebounce: null
    }
  },
  methods: {
    handleMouseOver(event) {
      if (!this.isRelatedTargetHoverCard(event)) {
        this.showHoverCard = true
        this.cancelHide()
      }
    },
    handleMouseOut(event) {
      if (!this.isRelatedTargetHoverCard(event)) {
        this.scheduleHide()
      }
    },
    isRelatedTargetHoverCard(event) {
      return event.relatedTarget?.closest('.hover-card')
    },
    scheduleHide() {
      this.hideDebounce = debounce(() => {
        this.showHoverCard = false
      }, 100)
      this.hideDebounce()
    },
    cancelHide() {
      if (this.hideDebounce) {
        this.hideDebounce.cancel()
      }
    }
  }
}
</script>

<style scoped>
.task {
  position: relative;
  padding: 8px 0;
}

.task-content {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
```