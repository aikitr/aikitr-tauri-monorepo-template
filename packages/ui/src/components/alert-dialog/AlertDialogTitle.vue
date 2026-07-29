<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { AlertDialogTitle } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const classes = computed(() => cn('text-lg font-semibold leading-none tracking-tight', props.class));
</script>

<template>
  <AlertDialogTitle :class="classes">
    <slot />
  </AlertDialogTitle>
</template>
