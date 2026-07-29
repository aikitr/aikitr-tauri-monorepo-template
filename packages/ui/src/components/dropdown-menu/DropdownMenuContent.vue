<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { DropdownMenuContent, DropdownMenuPortal } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}
const props = withDefaults(defineProps<Props>(), {
  side: 'bottom',
  sideOffset: 4,
  align: 'center',
});
const classes = computed(() =>
  cn(
    'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    props.class,
  ),
);
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent :side="side" :side-offset="sideOffset" :align="align" :class="classes">
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
