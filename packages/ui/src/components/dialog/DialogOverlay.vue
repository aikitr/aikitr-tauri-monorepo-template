<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { DialogPortal, DialogOverlay } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();
const classes = computed(() =>
  cn(
    'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    props.class,
  ),
);
</script>

<template>
  <DialogPortal>
    <DialogOverlay :class="classes" />
  </DialogPortal>
</template>
