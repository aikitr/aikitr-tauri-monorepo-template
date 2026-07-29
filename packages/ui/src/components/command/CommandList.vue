<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const classes = computed(() =>
  cn('max-h-[300px] overflow-y-auto overflow-x-hidden p-1', props.class),
);
</script>

<template>
  <div :class="classes" role="listbox">
    <slot />
  </div>
</template>
