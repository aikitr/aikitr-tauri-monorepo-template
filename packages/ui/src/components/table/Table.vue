<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const classes = computed(() =>
  cn('w-full caption-bottom text-sm', props.class),
);
</script>

<template>
  <table :class="classes">
    <slot />
  </table>
</template>
