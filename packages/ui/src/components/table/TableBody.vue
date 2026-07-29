<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const classes = computed(() =>
  cn('[&_tr:last-child]:border-0', props.class),
);
</script>

<template>
  <tbody :class="classes">
    <slot />
  </tbody>
</template>
