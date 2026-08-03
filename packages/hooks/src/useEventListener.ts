import { onBeforeUnmount, unref, watch, type Ref } from 'vue';

export function useEventListener<K extends keyof WindowEventMap>(
  target: Window | Document | HTMLElement | Ref<HTMLElement | null | undefined> | null,
  event: K | string,
  handler: (event: Event) => void,
  options?: AddEventListenerOptions,
): void {
  let cleanup: (() => void) | null = null;

  const attach = (el: Window | Document | HTMLElement | null): void => {
    if (!el) return;
    el.addEventListener(event, handler, options);
    cleanup = () => el.removeEventListener(event, handler, options);
  };

  if (typeof target === 'object' && target !== null && 'value' in target) {
    watch(
      () => unref(target),
      (el: HTMLElement | null | undefined) => {
        cleanup?.();
        attach(el ?? null);
      },
      { immediate: true, flush: 'post' },
    );
  } else {
    attach(target);
  }

  onBeforeUnmount(() => cleanup?.());
}
