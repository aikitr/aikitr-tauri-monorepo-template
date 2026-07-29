import { computed, watch } from 'vue';
import { useMediaQuery } from './useMediaQuery';
import { useStorage } from './useStorage';

export type ColorScheme = 'light' | 'dark';

const STORAGE_KEY = 'aikitr.theme';

export function useDarkMode() {
  const stored = useStorage<'light' | 'dark' | 'system'>(STORAGE_KEY, 'system');
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const isDark = computed<boolean>(() => {
    if (stored.value === 'system') return systemPrefersDark.value;
    return stored.value === 'dark';
  });

  const scheme = computed<ColorScheme>(() => (isDark.value ? 'dark' : 'light'));

  watch(
    isDark,
    (v) => {
      if (typeof document === 'undefined') return;
      const root = document.documentElement;
      root.classList.toggle('dark', v);
      root.style.colorScheme = v ? 'dark' : 'light';
    },
    { immediate: true },
  );

  return {
    isDark,
    scheme,
    preference: stored,
    setPreference: (p: 'light' | 'dark' | 'system') => {
      stored.value = p;
    },
    toggle: () => {
      stored.value = isDark.value ? 'light' : 'dark';
    },
  };
}
