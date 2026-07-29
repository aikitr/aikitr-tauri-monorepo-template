import { ref, watch, type Ref } from 'vue';

export function useThrottleFn<TArgs extends readonly unknown[]>(
  fn: (...args: TArgs) => unknown,
  wait = 200,
): { run: (...args: TArgs) => void; cancel: () => void } {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const lastArgs: { value: TArgs | null } = { value: null };

  const invoke = (): void => {
    if (lastArgs.value) {
      fn(...lastArgs.value);
      lastArgs.value = null;
    }
  };

  const cancel = (): void => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    last = 0;
    lastArgs.value = null;
  };

  const run = (...args: TArgs): void => {
    const now = Date.now();
    const remaining = wait - (now - last);
    lastArgs.value = args;
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      invoke();
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        invoke();
      }, remaining);
    }
  };

  watch(() => wait, cancel);

  return { run, cancel };
}
