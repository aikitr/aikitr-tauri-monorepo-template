<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();
const classes = computed(() =>
  cn('flex flex-row items-center gap-1', props.class),
);
</script>

<template>
  <ul :class="classes">
    <slot />
  </ul>
</template>
