import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import { router } from './router';
import { logger } from './services/logger';
import { initApiClient } from './services/api';
import { initTheme } from './composables/useTheme';

import { useAppStore } from './stores/app';
import { useSettingsStore } from './stores/settings';

import '@aikitr/ui/styles.css';
import './assets/styles/index.css';

async function bootstrap(): Promise<void> {
  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);
  app.use(router);

  // Initialize core services. Catch errors so they never block the initial mount.
  try {
    logger.info('bootstrapping aikitr desktop');
    initApiClient({ baseURL: import.meta.env.VITE_API_BASE_URL });
  } catch (e) {
    console.error('bootstrap: init services failed', e);
  }

  // Mount the app as early as possible so the user sees content
  // even if hydration or tauri bootstrapping takes time or fails.
  await router.isReady();
  app.mount('#app');

  // Defer hydration and theme init to after mount.
  void (async () => {
    try {
      initTheme();
    } catch (e) {
      console.error('bootstrap: initTheme failed', e);
    }
    try {
      const settings = useSettingsStore();
      await settings.hydrate();
    } catch (e) {
      console.error('bootstrap: settings hydrate failed', e);
    }
    try {
      const appStore = useAppStore();
      await appStore.bootstrap();
    } catch (e) {
      console.error('bootstrap: appStore bootstrap failed', e);
    }
    logger.info('aikitr desktop hydrated');
  })();
}

void bootstrap().catch((e) => {
  console.error('bootstrap: fatal error, attempting emergency mount', e);
  // Last-ditch mount so the user doesn't see a blank page.
  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  void router.isReady().then(() => app.mount('#app'));
});
