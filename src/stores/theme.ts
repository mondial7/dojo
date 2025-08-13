import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('light')
  
  // Initialize theme from localStorage or system preference
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('tdd-dojo-theme') as Theme | null
    if (savedTheme) {
      theme.value = savedTheme
    } else {
      // Use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.value = prefersDark ? 'dark' : 'light'
    }
    applyTheme()
  }
  
  // Apply theme to document
  const applyTheme = () => {
    document.documentElement.setAttribute('data-theme', theme.value)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme.value)
  }
  
  // Toggle between themes
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  
  // Watch for theme changes and persist
  watch(theme, (newTheme) => {
    localStorage.setItem('tdd-dojo-theme', newTheme)
    applyTheme()
  })
  
  return {
    theme,
    initializeTheme,
    toggleTheme,
    applyTheme
  }
})