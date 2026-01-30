```vue
<template>
  <div
    class="hover-card"
    v-show="visible"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['mouseenter', 'mouseleave'])

function onMouseEnter() {
  emit('mouseenter')
}

function onMouseLeave() {
  emit('mouseleave')
}
</script>

<style scoped>
.hover-card {
  position: absolute;
  background: var(--card-bg, #fff);
  border: 1px solid var(--card-border, #e0e0e0);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  z-index: 10;
}
</style>
```