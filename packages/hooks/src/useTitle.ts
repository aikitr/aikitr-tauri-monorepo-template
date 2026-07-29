import { watchEffect, onBeforeUnmount } from 'vue';

export function useTitle(title: () => string): void {
  const original = typeof document !== 'undefined' ? document.title : '';
  watchEffect(() => {
    if (typeof document === 'undefined') return;
    document.title = title();
  });
  onBeforeUnmount(() => {
    if (typeof document !== 'undefined') document.title = original;
  });
}
