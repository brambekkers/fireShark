import { createRouter, createWebHistory } from 'vue-router';

// routes
import Home from '@/pages/Home.vue';
import Duel from '@/pages/Duel.vue';
import Admin from '@/pages/Admin.vue';
import Login from '@/pages/Login.vue';
import Settings from '@/pages/Settings.vue';
import Practice from '@/pages/Practice.vue';

const routes = [
  {
    path: '/overview',
    name: 'Overview',
    component: Home,
  }, {
    path: '/practice',
    name: 'Practice',
    component: Practice,

  }, {
    path: '/duel',
    name: 'Duel',
    component: Duel,

  }, {
    path: '/admin',
    name: 'Admin',
    component: Admin,

  }, {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
  }, {
    path: '/:pathMatch(.*)*',
    redirect: '/overview',
  }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
