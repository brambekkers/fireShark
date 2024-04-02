// routes
import Home from '@/pages/Home.vue';
import Duel from '@/pages/Duel.vue';
import Settings from '@/pages/Settings.vue';
import Practice from '@/pages/Practice.vue';

// Admin
import Admin from '@/pages/Admin.vue';
import AdminUsers from '@/pages/admin/Users.vue';
import AdminGroups from '@/pages/admin/Groups.vue';
import AdminQuestions from '@/pages/admin/Questions.vue';

// Auth
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';


// layouts
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

export const routes = [
  {
    path: '/overview',
    name: 'Overview',
    component: Home,
    meta: {
      layout: MainLayout,
      requiresAuth: true,
    },
  },
  {
    path: '/practice',
    name: 'Practice',
    component: Practice,
    meta: {
      layout: MainLayout,
      requiresAuth: true,
    },
  },
  {
    path: '/duel',
    name: 'Duel',
    component: Duel,
    meta: {
      layout: MainLayout,
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    children: [
      {
        path: '',
        component: Admin,
      },
      {
        path: 'users',
        component: AdminUsers,
        meta: {
          requiresAuth: true,
          requiresModerator: true,
        },
      },
      {
        path: 'groups',
        component: AdminGroups,
        meta: {
          requiresAuth: true,
          requiresModerator: true,
        },
      },
      {
        path: 'questions',
        component: AdminQuestions,
        meta: {
          requiresAuth: true,
          requiresModerator: true,
        },
      },
    ],
    meta: {
      layout: AdminLayout,
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      layout: MainLayout,
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: AuthLayout,
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      layout: AuthLayout,
      requiresAuth: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/overview',
  },
];

export default routes;
