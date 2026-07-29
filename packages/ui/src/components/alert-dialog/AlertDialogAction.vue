<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { AlertDialogAction } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const classes = computed(() =>
  cn(
    'inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    props.class,
  ),
);
</script>

<template>
  <AlertDialogAction :class="classes">
    <slot />
  </AlertDialogAction>
</template>
