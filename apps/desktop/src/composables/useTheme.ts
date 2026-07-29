import { useDarkMode } from '@aikitr/hooks';
import { useSettingsStore } from '@/stores/settings';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

/**
 * Initializes the app theme by reconciling user preference with system theme.
 * Safe to call multiple times.
 */
export function initTheme(): void {
  const settings = useSettingsStore();
  const { settings: userSettings } = storeToRefs(settings);
  const dark = useDarkMode();

  // Sync the settings store's theme into the dark mode hook's storage.
  watch(
    () => userSettings.value.theme,
    (t) => {
      if (dark.preference.value !== t) dark.setPreference(t);
    },
    { immediate: true },
  );

  // Reflect changes made by the dark mode toggle back into settings.
  watch(
    () => dark.preference.value,
    (t) => {
      if (userSettings.value.theme !== t) settings.setTheme(t);
    },
  );
}
