import { createRouter, createWebHistory } from 'vue-router'

// routes
import Home from '@/pages/Home.vue'
import PageOne from '@/pages/PageOne.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
      path: '/pageone',
      name: 'PageOne',
      component: PageOne,
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router