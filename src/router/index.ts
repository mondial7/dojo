import { createRouter, createWebHistory } from 'vue-router'
import TDDView from '../views/TDDView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tdd',
      component: TDDView,
    },
  ],
})

export default router
