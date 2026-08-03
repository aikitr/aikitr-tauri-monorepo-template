import { useSettingsStore } from '@/stores/settings';
import { storeToRefs } from 'pinia';
import { computed, effect, watch } from 'vue';
import type { ColorScheme } from '@aikitr/hooks';
import { useStorage } from '@aikitr/hooks';
import type { ThemeMode } from '@aikitr/types';

type StoredTheme = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'aikitr.theme';

function readInitialStored(defaultValue: StoredTheme): StoredTheme {
  if (typeof localStorage === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return defaultValue;
    const parsed: unknown = JSON.parse(raw);
    if (parsed === 'light' || parsed === 'dark' || parsed === 'system') return parsed;
  } catch {
    /* ignore */
  }
  return defaultValue;
}

function systemIsDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Initializes the app theme by reconciling user preference with system theme.
 * This is designed to be called outside of a component setup (e.g. from bootstrap),
 * so it avoids lifecycle hooks and component-scoped APIs.
 */
export function initTheme(): void {
  const settings = useSettingsStore();
  const { settings: userSettings } = storeToRefs(settings);

  const stored = useStorage<StoredTheme>(STORAGE_KEY, readInitialStored('system'));

  // Detect system theme at startup and on OS theme changes.
  let mql: MediaQueryList | null = null;
  if (typeof window !== 'undefined' && window.matchMedia) {
    try {
      mql = window.matchMedia('(prefers-color-scheme: dark)');
    } catch {
      mql = null;
    }
  }

  function currentIsDark(): boolean {
    if (stored.value === 'system') return systemIsDark();
    return stored.value === 'dark';
  }

  const isDark = computed<boolean>(currentIsDark);
  const scheme = computed<ColorScheme>(() => (isDark.value ? 'dark' : 'light'));

  // Subscribe to system theme changes.
  function onSystemChange(): void {
    if (stored.value === 'system') applyTheme();
  }
  if (mql) {
    try {
      mql.addEventListener('change', onSystemChange);
    } catch {
      // older Safari
      try {
        mql.addListener?.(onSystemChange);
      } catch {
        /* ignore */
      }
    }
  }

  function applyTheme(): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const dark = isDark.value;
    root.classList.toggle('dark', dark);
    root.style.colorScheme = dark ? 'dark' : 'light';
  }

  function setPreference(p: ThemeMode): void {
    stored.value = p;
  }

  function toggle(): void {
    stored.value = isDark.value ? 'light' : 'dark';
  }

  // React to changes and apply to DOM immediately.
  effect(() => {
    // trigger reactive tracking by reading isDark.value
    void isDark.value;
    applyTheme();
  });

  // Sync the settings store's theme into the dark mode hook's storage.
  watch(
    () => userSettings.value.theme,
    (t) => {
      if (stored.value !== t) setPreference(t);
    },
    { immediate: true },
  );

  // Reflect changes made by the dark mode toggle back into settings.
  watch(
    () => stored.value,
    (t) => {
      if (userSettings.value.theme !== t) settings.setTheme(t);
    },
  );

  // expose theme helpers on window for debug/dev buttons
  if (typeof window !== 'undefined') {
    (
      window as unknown as {
        __aikitrTheme?: {
          isDark: () => boolean;
          toggle: () => void;
          scheme: () => ColorScheme;
          preference: () => StoredTheme;
          setPreference: (p: ThemeMode) => void;
        };
      }
    ).__aikitrTheme = {
      isDark: () => isDark.value,
      toggle,
      scheme: () => scheme.value,
      preference: () => stored.value,
      setPreference,
    };
  }
}
