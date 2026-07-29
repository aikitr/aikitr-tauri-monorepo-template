import { ref, watch, type Ref } from 'vue';

export function useStorage<T>(
  key: string,
  defaultValue: T,
  storage: Storage = localStorage,
): Ref<T> {
  const initial = ((): T => {
    try {
      const raw = storage.getItem(key);
      return raw === null ? defaultValue : (JSON.parse(raw) as T);
    } catch {
      return defaultValue;
    }
  })();
  const state = ref(initial) as Ref<T>;

  watch(
    state,
    (v) => {
      try {
        storage.setItem(key, JSON.stringify(v));
      } catch {
        /* quota exceeded */
      }
    },
    { deep: true },
  );

  return state;
}
