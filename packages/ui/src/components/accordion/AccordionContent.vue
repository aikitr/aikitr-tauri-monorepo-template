<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { AccordionContent } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const classes = computed(() =>
  cn(
    'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
    props.class,
  ),
);
</script>

<template>
  <AccordionContent :class="classes">
    <div class="pt-0 pb-4">
      <slot />
    </div>
  </AccordionContent>
</template>
