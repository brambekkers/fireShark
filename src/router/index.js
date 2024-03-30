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
  const requiresAdmin = to.meta.requiresAdmin || false;
  const requiresModerator = to.meta.requiresModerator || false;
  const requiresEditor = to.meta.requiresEditor || false;

  if (requiresAuth) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      next({ name: 'Login' });
    }

    const token = await currentUser.getIdTokenResult(true)
    const role = token?.claims.role || 'user';

    if (requiresAdmin && role !== 'admin') {
      next('/overview');
    }
    if (requiresModerator && (role !== 'moderator' && role !== 'admin')) {
      next('/overview');
    }
    if (requiresEditor && (role !== 'editor' && role !== 'moderator' && role !== 'admin')) {
      next('/overview');
    }
  }

  next();
});

export default router;
