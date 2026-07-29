<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const classes = computed(() => cn('py-6 text-center text-sm', props.class));
</script>

<template>
  <div :class="classes" role="presentation">
    <slot>No results found.</slot>
  </div>
</template>
