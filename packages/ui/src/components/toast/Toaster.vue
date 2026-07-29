<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../lib/utils';
import { useToast, type Toast } from './useToast';

const { toasts, dismiss } = useToast();

const items = computed(() => toasts.value);

function variantClass(t: Toast): string {
  switch (t.variant) {
    case 'destructive':
      return 'border-destructive/50 bg-destructive text-destructive-foreground';
    case 'success':
      return 'border-green-600/50 bg-green-600 text-white';
    default:
      return 'border-border bg-background text-foreground';
  }
}
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-[100] flex flex-col-reverse items-end gap-2 p-4 sm:bottom-4 sm:right-4 sm:top-auto sm:flex-col"
  >
    <TransitionGroup
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-for="t in items"
        :key="t.id"
        :class="
          cn(
            'pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-md border p-4 shadow-lg',
            variantClass(t),
          )
        "
        role="status"
        aria-live="polite"
      >
        <div class="grid gap-1">
          <div class="text-sm font-semibold">{{ t.title }}</div>
          <div v-if="t.description" class="text-sm opacity-90">{{ t.description }}</div>
        </div>
        <button
          class="absolute right-2 top-2 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100"
          aria-label="Dismiss"
          @click="dismiss(t.id)"
        >
          ✕
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
