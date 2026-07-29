import { describe, it, expect } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useAppStore } from './app';
import { useSettingsStore } from './settings';

describe('stores', () => {
  it('app store bootstraps', async () => {
    setActivePinia(createPinia());
    const store = useAppStore();
    expect(store.bootstrapped).toBe(false);
  });

  it('settings store provides defaults', () => {
    setActivePinia(createPinia());
    const store = useSettingsStore();
    expect(store.settings.theme).toBe('system');
    expect(store.settings.locale).toBe('en-US');
  });

  it('settings store reset works', () => {
    setActivePinia(createPinia());
    const store = useSettingsStore();
    store.setFontSize(99);
    store.reset();
    expect(store.settings.fontSize).toBe(14);
  });
});
