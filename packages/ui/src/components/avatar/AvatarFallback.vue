<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { AvatarFallback } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  delayMs?: number;
}
const props = defineProps<Props>();

const classes = computed(() =>
  cn(
    'flex h-full w-full items-center justify-center rounded-full bg-muted',
    props.class,
  ),
);
</script>

<template>
  <AvatarFallback :delay-ms="props.delayMs" :class="classes">
    <slot />
  </AvatarFallback>
</template>
