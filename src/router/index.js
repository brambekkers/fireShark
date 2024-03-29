import { getCurrentUser } from 'vuefire';
import { createRouter, createWebHistory } from 'vue-router';

import { routes } from './routes.js';

const router = createRouter({
  scrollBehavior() {
    return { top: 0 };
  },
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth || false;

  if (requiresAuth) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      next({ name: 'Login' });
    }
  }

  next();
});

export default router;
