<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { SelectLabel } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const classes = computed(() =>
  cn('px-2 py-1.5 text-sm font-semibold', props.class),
);
</script>

<template>
  <SelectLabel :class="classes">
    <slot />
  </SelectLabel>
</template>
