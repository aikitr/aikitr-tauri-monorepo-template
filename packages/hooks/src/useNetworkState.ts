import { ref, onBeforeUnmount } from 'vue';

export function useNetworkState() {
  const online = ref(typeof navigator === 'undefined' ? true : navigator.onLine);
  const onOnline = (): void => {
    online.value = true;
  };
  const onOffline = (): void => {
    online.value = false;
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
  }
  onBeforeUnmount(() => {
    if (typeof window === 'undefined') return;
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  });

  return { online };
}
