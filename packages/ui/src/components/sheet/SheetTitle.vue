<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const classes = computed(() =>
  cn('text-lg font-semibold text-foreground', props.class),
);
</script>

<template>
  <h3 :class="classes">
    <slot />
  </h3>
</template>
