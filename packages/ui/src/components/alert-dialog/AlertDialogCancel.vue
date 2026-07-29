<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { AlertDialogCancel } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const classes = computed(() =>
  cn(
    'inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    props.class,
  ),
);
</script>

<template>
  <AlertDialogCancel :class="classes">
    <slot />
  </AlertDialogCancel>
</template>
