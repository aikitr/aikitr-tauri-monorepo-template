<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  active?: boolean;
  disabled?: boolean;
  page?: number;
  asChild?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  active: false,
  disabled: false,
  asChild: false,
});
const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0',
    'border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
    'h-9 px-4 py-2',
    props.active && 'border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
    props.disabled && 'pointer-events-none opacity-50',
    props.class,
  ),
);
</script>

<template>
  <component
    :is="asChild ? 'span' : 'button'"
    :class="classes"
    :disabled="disabled"
    :aria-current="active ? 'page' : undefined"
  >
    <slot />
  </component>
</template>
