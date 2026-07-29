<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();
const classes = computed(() => cn('', props.class));
</script>

<template>
  <li :class="classes">
    <slot />
  </li>
</template>
