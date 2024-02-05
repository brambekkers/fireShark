import { createRouter, createWebHistory } from 'vue-router'

// routes
import Home from '@/pages/Home.vue'
import PageOne from '@/pages/PageOne.vue'

const routes = [
  {
    path: '/overview',
    name: 'Home',
    component: Home,
  }, {
    path: '/practice',
    name: 'Practice',
    component: PageOne,
  }, {
    path: '/duel',
    name: 'Duel',
  }, {
    path: '/admin',
    name: 'Admin',
  }, {
    path: '/settings',
    name: 'Settings',
  }, {
    path: '/login',
    name: 'Login',
  },{
    path: '/:pathMatch(.*)*',
    redirect: '/overview',
  }];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router