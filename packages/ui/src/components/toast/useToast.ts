import { ref, readonly } from 'vue';

export type ToastVariant = 'default' | 'destructive' | 'success';

export interface Toast {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly variant?: ToastVariant;
  readonly duration?: number;
}

const toasts = ref<Toast[]>([]);

function push(t: Omit<Toast, 'id'>): string {
  const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const item: Toast = { id, duration: 4000, variant: 'default', ...t };
  toasts.value = [...toasts.value, item];
  if (item.duration && item.duration > 0) {
    setTimeout(() => dismiss(id), item.duration);
  }
  return id;
}

function dismiss(id: string): void {
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

export function useToast() {
  return {
    toasts: readonly(toasts),
    push,
    dismiss,
    success: (title: string, description?: string) =>
      push({ title, description, variant: 'success' }),
    error: (title: string, description?: string) =>
      push({ title, description, variant: 'destructive' }),
    info: (title: string, description?: string) => push({ title, description }),
  };
}
