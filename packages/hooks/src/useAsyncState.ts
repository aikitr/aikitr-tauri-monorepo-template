import { ref, shallowRef, type Ref } from 'vue';

export interface AsyncState<T> {
  state: Ref<'idle' | 'pending' | 'success' | 'error'>;
  data: Ref<T | null>;
  error: Ref<Error | null>;
  isLoading: Readonly<Ref<boolean>>;
  execute: (...args: unknown[]) => Promise<T | null>;
  reset: () => void;
}

export function useAsyncState<T>(
  fn: () => Promise<T>,
  initialData: T | null = null,
): AsyncState<T> {
  const state = ref<'idle' | 'pending' | 'success' | 'error'>('idle');
  const data = shallowRef<T | null>(initialData) as Ref<T | null>;
  const error = ref<Error | null>(null);
  const isLoading = computedRef(() => state.value === 'pending');

  const execute = async (..._args: unknown[]): Promise<T | null> => {
    state.value = 'pending';
    error.value = null;
    try {
      const result = await fn();
      data.value = result;
      state.value = 'success';
      return result;
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
      state.value = 'error';
      return null;
    }
  };

  const reset = (): void => {
    state.value = 'idle';
    data.value = initialData;
    error.value = null;
  };

  return { state, data, error, isLoading, execute, reset };
}

import { computed } from 'vue';
function computedRef<T>(getter: () => T) {
  return computed(getter);
}
