<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const classes = computed(() =>
  cn('[&_tr]:border-b', props.class),
);
</script>

<template>
  <thead :class="classes">
    <slot />
  </thead>
</template>
