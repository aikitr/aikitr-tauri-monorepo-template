import { ref, watch, type Ref } from 'vue';

export function useDebounceFn<TArgs extends readonly unknown[]>(
  fn: (...args: TArgs) => unknown,
  delay = 200,
): { run: (...args: TArgs) => void; cancel: () => void; pending: Ref<boolean> } {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const pending = ref(false);

  const cancel = (): void => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    pending.value = false;
  };

  const run = (...args: TArgs): void => {
    cancel();
    pending.value = true;
    timer = setTimeout(() => {
      pending.value = false;
      timer = null;
      fn(...args);
    }, delay);
  };

  watch(() => delay, cancel, { flush: 'sync' });

  return { run, cancel, pending };
}
