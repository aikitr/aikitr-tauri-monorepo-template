<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { AccordionTrigger } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  asChild?: boolean;
}
const props = withDefaults(defineProps<Props>(), { asChild: false });

const classes = computed(() =>
  cn(
    'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline',
    'data-[state=open]:rotate-180',
    props.class,
  ),
);
</script>

<template>
  <AccordionTrigger :as-child="asChild" :class="classes">
    <slot />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-4 w-4 shrink-0 transition-transform duration-200"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </AccordionTrigger>
</template>
