<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initializeTheme()
})
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style>
:root {
  --color-white: #ffffff;
  --color-black: #000000;
  
  /* Light theme colors */
  --color-background: #ffffff;
  --color-background-soft: #f8fafc;
  --color-background-mute: #f1f5f9;
  
  --color-border: #e2e8f0;
  --color-border-hover: #cbd5e1;
  
  --color-heading: #1e293b;
  --color-text: #334155;
  --color-text-soft: #64748b;
  
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  
  --color-success: #22c55e;
  --color-success-hover: #16a34a;
  
  --color-warning: #f59e0b;
  --color-warning-hover: #d97706;
  
  --color-danger: #ef4444;
  --color-danger-hover: #dc2626;
}

[data-theme="dark"] {
  --color-background: #0f172a;
  --color-background-soft: #1e293b;
  --color-background-mute: #334155;
  
  --color-border: #475569;
  --color-border-hover: #64748b;
  
  --color-heading: #f1f5f9;
  --color-text: #cbd5e1;
  --color-text-soft: #94a3b8;
  
  --color-primary: #60a5fa;
  --color-primary-hover: #3b82f6;
  
  --color-success: #4ade80;
  --color-success-hover: #22c55e;
  
  --color-warning: #fbbf24;
  --color-warning-hover: #f59e0b;
  
  --color-danger: #f87171;
  --color-danger-hover: #ef4444;
}

* {
  box-sizing: border-box;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

body {
  margin: 0;
  padding: 0;
  background: var(--color-background-soft);
  color: var(--color-text);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
}

/* Scrollbar styling for dark mode */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-background-mute);
}

::-webkit-scrollbar-thumb {
  background: var(--color-border-hover);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-soft);
}
</style>
