```vue
<template>
  <div 
    class="task-hover-card"
    @mouseenter="$emit('card-enter')"
    @mouseleave="$emit('card-leave')"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TaskHoverCard',
  emits: ['card-enter', 'card-leave']
}
</script>

<style scoped>
.task-hover-card {
  position: absolute;
  z-index: 100;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: opacity 0.2s ease;
}
</style>
```