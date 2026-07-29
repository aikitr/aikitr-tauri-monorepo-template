<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { AlertDialogDescription } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const classes = computed(() => cn('text-sm text-muted-foreground', props.class));
</script>

<template>
  <AlertDialogDescription :class="classes">
    <slot />
  </AlertDialogDescription>
</template>
