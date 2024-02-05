import { createRouter, createWebHistory } from 'vue-router'

// routes
import Home from '@/pages/Home.vue'
import Duel from '@/pages/Duel.vue'
import Admin from '@/pages/Admin.vue'
import Login from '@/pages/Login.vue'
import Settings from '@/pages/Settings.vue'

const routes = [
  {
    path: '/overview',
    name: 'Home',
    component: Home,
  }, 
  {
    path: '/practice',
    name: 'Practice',
  }, 
  {
    path: '/duel',
    name: 'Duel',
    component: Duel,

  }, 
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,

  }, 
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  }, 
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/overview',
  }]


  

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router