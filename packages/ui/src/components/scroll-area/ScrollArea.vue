<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { ScrollAreaRoot, ScrollAreaViewport } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  orientation?: 'vertical' | 'horizontal' | 'both';
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
});

const classes = computed(() =>
  cn('relative overflow-hidden', props.class),
);
</script>

<template>
  <ScrollAreaRoot :class="classes" :orientation="orientation">
    <ScrollAreaViewport class="h-full w-full rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <slot name="scrollbar" />
  </ScrollAreaRoot>
</template>
