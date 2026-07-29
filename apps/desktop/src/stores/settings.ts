import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { DEFAULT_SETTINGS, type UserSettings, type ThemeMode, type Locale } from '@aikitr/types';
import { storage } from '@/services/tauri';
import { logger } from '@/services/logger';

const STORAGE_KEY = 'aikitr.settings.v1';

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<UserSettings>({ ...DEFAULT_SETTINGS });
  const hydrated = ref(false);

  async function hydrate(): Promise<void> {
    if (hydrated.value) return;
    try {
      const stored = await storage.get<UserSettings>(STORAGE_KEY);
      if (stored) settings.value = { ...DEFAULT_SETTINGS, ...stored };
    } catch (e) {
      logger.warn('settings hydrate failed; using defaults', { error: String(e) });
    } finally {
      hydrated.value = true;
    }
  }

  async function persist(): Promise<void> {
    try {
      await storage.set(STORAGE_KEY, settings.value);
    } catch (e) {
      logger.warn('settings persist failed', { error: String(e) });
    }
  }

  function setTheme(theme: ThemeMode): void {
    settings.value = { ...settings.value, theme };
  }

  function setLocale(locale: Locale): void {
    settings.value = { ...settings.value, locale };
  }

  function setFontSize(fontSize: number): void {
    settings.value = { ...settings.value, fontSize: Math.max(10, Math.min(24, fontSize)) };
  }

  function setAutoUpdate(autoUpdate: boolean): void {
    settings.value = { ...settings.value, autoUpdate };
  }

  function setSendTelemetry(sendTelemetry: boolean): void {
    settings.value = { ...settings.value, sendTelemetry };
  }

  function reset(): void {
    settings.value = { ...DEFAULT_SETTINGS };
  }

  watch(settings, persist, { deep: true });

  return {
    settings,
    hydrated,
    hydrate,
    setTheme,
    setLocale,
    setFontSize,
    setAutoUpdate,
    setSendTelemetry,
    reset,
  };
});
