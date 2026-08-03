import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';
import { logger } from '@/services/logger';
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(_to, _from, saved) {
    return saved ?? { top: 0 };
  },
});

const titleHelper = useTitleFromStore();

router.beforeEach((to, _from, next) => {
  logger.debug('navigation', { to: to.fullPath, name: String(to.name) });
  const title = (to.meta as { title?: string }).title;
  if (title) titleHelper.setTitle(`${title} · Aikitr`);
  next();
});

router.onError((error) => {
  logger.error('router error', { error: error instanceof Error ? error.message : String(error) });
});

function useTitleFromStore() {
  // Defer to setTitle defined in App.vue pattern — use document.title directly here.
  return {
    setTitle(title: string): void {
      if (typeof document !== 'undefined') document.title = title;
    },
  };
}
