import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import { type AppInfo, type AppPlatform } from '@aikitr/types';
import { tauri } from '@/services/tauri';
import { logger } from '@/services/logger';

export const useAppStore = defineStore('app', () => {
  const info = shallowRef<AppInfo | null>(null);
  const bootstrapped = ref(false);
  const bootstrapping = ref(false);
  const platform = ref<AppPlatform>('linux');

  async function bootstrap(): Promise<void> {
    if (bootstrapped.value || bootstrapping.value) return;
    bootstrapping.value = true;
    try {
      const [infoResult, platformResult] = await Promise.all([
        tauri.app.getInfo(),
        tauri.app.getPlatform(),
      ]);
      if (infoResult) {
        info.value = infoResult;
        logger.info('app info loaded', infoResult);
      }
      platform.value = platformResult;
    } catch (e) {
      logger.error('failed to bootstrap app info', { error: String(e) });
    } finally {
      bootstrapping.value = false;
      bootstrapped.value = true;
    }
  }

  return { info, bootstrapped, bootstrapping, platform, bootstrap };
});
