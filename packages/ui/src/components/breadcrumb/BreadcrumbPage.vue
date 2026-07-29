<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const classes = computed(() => cn('font-normal text-foreground', props.class));
</script>

<template>
  <span role="link" aria-disabled="true" aria-current="page" :class="classes">
    <slot />
  </span>
</template>
