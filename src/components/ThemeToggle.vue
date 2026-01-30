```vue
<template>
  <button
    class="theme-toggle"
    :aria-label="`Switch to ${nextTheme} mode`"
    @click="toggleTheme"
  >
    <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
      <path
        d="M21.64 13.13a1 1 0 0 0-1.12-.72 7.5 7.5 0 0 1-8.84-8.84 1 1 0 0 0-.72-1.12 1 1 0 0 0-1 .33 9.99 9.99 0 1 0 11.68 11.68 1 1 0 0 0 .33-1z"
      />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
      <path
        d="M12 3a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm5.66 2.34a1 1 0 0 1 1.41 0l1.42 1.41a1 1 0 0 1-1.41 1.42l-1.42-1.41a1 1 0 0 1 0-1.42zM19 11a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zm-7 7a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zm-6.66-2.34a1 1 0 0 1 0 1.42L4.22 18.5a1 1 0 1 1-1.41-1.42l1.42-1.41a1 1 0 0 1 1.41 0zM5 11a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
      />
    </svg>
  </button>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isDark = computed(() => store.state.settings.darkMode);

const nextTheme = computed(() => (isDark.value ? 'light' : 'dark'));

function toggleTheme() {
  store.commit('settings/SET_DARK_MODE', !isDark.value);
}
</script>

<style scoped>
.theme-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
}
</style>
```