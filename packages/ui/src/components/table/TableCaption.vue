<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const classes = computed(() =>
  cn('mt-4 text-sm text-muted-foreground', props.class),
);
</script>

<template>
  <caption :class="classes">
    <slot />
  </caption>
</template>
