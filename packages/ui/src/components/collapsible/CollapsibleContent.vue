<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { CollapsibleContent } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const classes = computed(() =>
  cn(
    'overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
    props.class,
  ),
);
</script>

<template>
  <CollapsibleContent :class="classes">
    <slot />
  </CollapsibleContent>
</template>
