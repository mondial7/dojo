<template>
  <button
    @click="themeStore.toggleTheme()"
    class="theme-toggle"
    :title="`Switch to ${themeStore.theme === 'light' ? 'dark' : 'light'} mode`"
  >
    <span v-if="themeStore.theme === 'light'" class="icon">🌙</span>
    <span v-else class="icon">☀️</span>
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<style scoped>
.theme-toggle {
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
}

.theme-toggle:hover {
  background: var(--color-background-soft);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.icon {
  font-size: 18px;
  display: block;
  line-height: 1;
}

/* Dark mode styles */
:global([data-theme="dark"]) .theme-toggle {
  background: var(--color-background-mute);
  border-color: var(--color-border);
  color: var(--color-text);
}

:global([data-theme="dark"]) .theme-toggle:hover {
  background: var(--color-background-soft);
}
</style>