<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { HoverCardTrigger } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  asChild?: boolean;
}
const props = withDefaults(defineProps<Props>(), { asChild: true });
const classes = computed(() => cn(props.class));
</script>

<template>
  <HoverCardTrigger :as-child="asChild" :class="classes">
    <slot />
  </HoverCardTrigger>
</template>
