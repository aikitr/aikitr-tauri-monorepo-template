<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { TooltipTrigger } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  asChild?: boolean;
}
const props = withDefaults(defineProps<Props>(), { asChild: true });
const classes = computed(() => cn(props.class));
</script>

<template>
  <TooltipTrigger :as-child="asChild" :class="classes">
    <slot />
  </TooltipTrigger>
</template>
