import { onBeforeUnmount, ref, type Ref } from 'vue';

export function useIntervalFn(
  cb: () => void,
  interval = 1000,
  options: { immediate?: boolean; immediateCallback?: boolean } = {},
): { pause: () => void; resume: () => void; isActive: Ref<boolean> } {
  const isActive = ref(false);
  let timer: ReturnType<typeof setInterval> | null = null;

  const start = (): void => {
    if (timer) return;
    isActive.value = true;
    if (options.immediateCallback !== false) cb();
    timer = setInterval(cb, interval);
  };
  const stop = (): void => {
    if (!timer) return;
    clearInterval(timer);
    timer = null;
    isActive.value = false;
  };

  if (options.immediate !== false) start();
  onBeforeUnmount(stop);

  return { pause: stop, resume: start, isActive };
}
