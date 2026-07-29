<script setup lang="ts">
import { computed, type HTMLAttributes, provide, ref } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const filterValue = ref('');

provide('command-filter', filterValue);

const classes = computed(() =>
  cn(
    'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
    props.class,
  ),
);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
