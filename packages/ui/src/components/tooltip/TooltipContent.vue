<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { TooltipContent, TooltipPortal } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
}
const props = withDefaults(defineProps<Props>(), { side: 'top', sideOffset: 4 });
const classes = computed(() =>
  cn(
    'z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
    'data-[state=delayed-open]:data-[side=bottom]:slide-in-from-top-2',
    'data-[state=delayed-open]:data-[side=left]:slide-in-from-right-2',
    'data-[state=delayed-open]:data-[side=right]:slide-in-from-left-2',
    'data-[state=delayed-open]:data-[side=top]:slide-in-from-bottom-2',
    props.class,
  ),
);
</script>

<template>
  <TooltipPortal>
    <TooltipContent :side="side" :side-offset="sideOffset" :class="classes">
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
