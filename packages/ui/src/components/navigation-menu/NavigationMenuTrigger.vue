<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { NavigationMenuTrigger } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  asChild?: boolean;
}
const props = withDefaults(defineProps<Props>(), { disabled: false, asChild: true });
const classes = computed(() =>
  cn(
    'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    'focus:bg-accent focus:text-accent-foreground',
    'focus:outline-none disabled:pointer-events-none disabled:opacity-50',
    'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
    props.class,
  ),
);
</script>

<template>
  <NavigationMenuTrigger :disabled="disabled" :as-child="asChild" :class="classes">
    <slot />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="relative top-px ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </NavigationMenuTrigger>
</template>
