<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();
const classes = computed(() =>
  cn('mx-auto flex w-full justify-center', props.class),
);
</script>

<template>
  <nav role="navigation" :class="classes" aria-label="pagination">
    <slot />
  </nav>
</template>
