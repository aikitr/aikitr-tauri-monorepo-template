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

  // Initialize core services in a deterministic order.
  logger.info('bootstrapping aikitr desktop');
  initApiClient({ baseURL: import.meta.env.VITE_API_BASE_URL });
  initTheme();

  // Hydrate stores from persistent storage before mounting.
  const settings = useSettingsStore();
  await settings.hydrate();

  const appStore = useAppStore();
  await appStore.bootstrap();

  app.mount('#app');
  logger.info('aikitr desktop mounted');
}

void bootstrap();
