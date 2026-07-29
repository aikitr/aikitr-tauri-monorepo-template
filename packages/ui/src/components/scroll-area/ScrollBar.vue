<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  orientation?: 'vertical' | 'horizontal';
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
});

const scrollbarClasses = computed(() =>
  cn(
    'flex touch-none select-none transition-colors',
    orientation === 'vertical'
      ? 'h-full w-2.5 border-l border-l-transparent p-[1px]'
      : 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
    props.class,
  ),
);

const orientation = computed(() => props.orientation);
</script>

<template>
  <ScrollAreaScrollbar :orientation="orientation" :class="scrollbarClasses">
    <ScrollAreaThumb class="relative flex-1 rounded-full bg-border" />
  </ScrollAreaScrollbar>
</template>
