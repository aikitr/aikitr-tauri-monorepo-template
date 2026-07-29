<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { AccordionItem, type AccordionItemProps } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props extends AccordionItemProps {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const classes = computed(() =>
  cn('border-b', props.class),
);
</script>

<template>
  <AccordionItem :class="classes" :value="props.value" :disabled="props.disabled">
    <slot />
  </AccordionItem>
</template>
