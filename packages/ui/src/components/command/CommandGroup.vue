<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  heading?: string;
}
const props = defineProps<Props>();

const classes = computed(() =>
  cn(
    'overflow-hidden p-1 text-foreground',
    '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
    props.class,
  ),
);
</script>

<template>
  <div :class="classes" role="group">
    <div v-if="heading" cmdk-group-heading="" class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
      {{ heading }}
    </div>
    <slot />
  </div>
</template>
