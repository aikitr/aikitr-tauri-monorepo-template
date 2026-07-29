<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { ContextMenuSubTrigger } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  textValue?: string;
  inset?: boolean;
}
const props = withDefaults(defineProps<Props>(), { disabled: false, inset: false });

const classes = computed(() =>
  cn(
    'flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
    'focus:bg-accent focus:text-accent-foreground',
    'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    props.inset && 'pl-8',
    props.class,
  ),
);
</script>

<template>
  <ContextMenuSubTrigger :disabled="disabled" :text-value="textValue" :class="classes">
    <slot />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="ml-auto h-4 w-4"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  </ContextMenuSubTrigger>
</template>
