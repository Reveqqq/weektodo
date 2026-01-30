```vue
<template>
  <div
    class="task"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
  >
    <div class="task-content">
      <slot></slot>
    </div>
    <HoverCard
      v-if="showHoverCard"
      ref="hoverCard"
      :task="task"
      class="task-hover-card"
    />
  </div>
</template>

<script>
import HoverCard from './HoverCard.vue'
import { debounce } from 'lodash'

export default {
  components: { HoverCard },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showHoverCard: false,
      hideDebounced: debounce(() => {
        this.showHoverCard = false
      }, 100)
    }
  },
  methods: {
    handleMouseOver(event) {
      if (!this.isHoverCard(event.relatedTarget)) {
        this.showHoverCard = true
        this.hideDebounced.cancel()
      }
    },
    handleMouseOut(event) {
      if (!this.isHoverCard(event.relatedTarget)) {
        this.hideDebounced()
      }
    },
    isHoverCard(element) {
      return element === this.$refs.hoverCard?.$el || 
             this.$refs.hoverCard?.$el.contains(element)
    }
  }
}
</script>

<style scoped>
.task {
  position: relative;
  padding-bottom: 4px;
}

.task-hover-card {
  margin-top: 4px;
}
</style>
```