<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { DialogContent, DialogPortal, DialogTitle, DialogDescription } from 'reka-ui';
import { cn } from '../../lib/utils';
import DialogOverlay from './DialogOverlay.vue';

interface Props {
  class?: HTMLAttributes['class'];
  title?: string;
  description?: string;
}
const props = defineProps<Props>();
const classes = computed(() =>
  cn(
    'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-border bg-background p-6 shadow-lg sm:rounded-lg',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    props.class,
  ),
);
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent :class="classes">
      <DialogTitle v-if="title" class="text-lg font-semibold leading-none tracking-tight">
        {{ title }}
      </DialogTitle>
      <DialogDescription v-if="description" class="text-sm text-muted-foreground">
        {{ description }}
      </DialogDescription>
      <slot />
    </DialogContent>
  </DialogPortal>
</template>
