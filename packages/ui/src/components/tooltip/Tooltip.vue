<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { TooltipProvider, TooltipRoot } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  open?: boolean;
  defaultOpen?: boolean;
  delayDuration?: number;
}
const props = withDefaults(defineProps<Props>(), { delayDuration: 200 });
const classes = computed(() => cn(props.class));
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration">
    <TooltipRoot :open="open" :default-open="defaultOpen" :class="classes">
      <slot />
    </TooltipRoot>
  </TooltipProvider>
</template>
