<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), { disabled: false });
const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0',
    'border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
    'h-9 px-4 py-2',
    props.disabled && 'pointer-events-none opacity-50',
    props.class,
  ),
);
</script>

<template>
  <button :class="classes" :disabled="disabled" aria-label="Go to previous page">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-4 w-4"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
    <slot />
  </button>
</template>
