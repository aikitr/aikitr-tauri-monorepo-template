<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import {
  AlertDialogContent,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogDescription,
} from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  title?: string;
  description?: string;
}
const props = defineProps<Props>();

const overlayClasses = computed(() =>
  cn(
    'fixed inset-0 z-50 bg-black/80',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ),
);

const contentClasses = computed(() =>
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
  <AlertDialogPortal>
    <AlertDialogOverlay :class="overlayClasses" />
    <AlertDialogContent :class="contentClasses">
      <AlertDialogTitle v-if="title" class="text-lg font-semibold leading-none tracking-tight">
        {{ title }}
      </AlertDialogTitle>
      <AlertDialogDescription v-if="description" class="text-sm text-muted-foreground">
        {{ description }}
      </AlertDialogDescription>
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>
