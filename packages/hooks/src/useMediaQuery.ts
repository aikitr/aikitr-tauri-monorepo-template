import { ref, onBeforeUnmount, getCurrentInstance, type Ref } from 'vue';

export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false);
  if (typeof window === 'undefined' || !window.matchMedia) return matches;

  const mql = window.matchMedia(query);
  matches.value = mql.matches;
  const onChange = (e: MediaQueryListEvent): void => {
    matches.value = e.matches;
  };
  mql.addEventListener('change', onChange);
  const instance = getCurrentInstance();
  if (instance != null) {
    onBeforeUnmount(() => mql.removeEventListener('change', onChange));
  }
  return matches;
}
