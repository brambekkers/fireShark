// routes
import Home from '@/pages/Home.vue';
import Duel from '@/pages/Duel.vue';
import Admin from '@/pages/Admin.vue';
import Login from '@/pages/Login.vue';
import Settings from '@/pages/Settings.vue';
import Practice from '@/pages/Practice.vue';

// layouts
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

export const routes = [
  {
    path: '/overview',
    name: 'Overview',
    component: Home,
    meta: {
      layout: MainLayout,
      requiresAuth: true

    }
  },
  {
    path: '/practice',
    name: 'Practice',
    component: Practice,
    meta: {
      layout: MainLayout,
      requiresAuth: true
    }
  },
  {
    path: '/duel',
    name: 'Duel',
    component: Duel,
    meta: {
      layout: MainLayout,
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      layout: MainLayout,
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      layout: MainLayout,
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: AuthLayout,
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/overview',
  },
];

export default routes;
