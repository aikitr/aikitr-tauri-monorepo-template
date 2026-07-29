<script setup lang="ts">
import { computed, inject, type ComputedRef, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  for?: string;
}
const props = defineProps<Props>();

const fieldContext = inject<{
  error: ComputedRef<string | undefined>;
} | null>('formFieldContext', null);

const hasError = computed(() => !!fieldContext?.error?.value);

const classes = computed(() =>
  cn(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    hasError.value && 'text-destructive',
    props.class,
  ),
);
</script>

<template>
  <label :for="props.for" :class="classes">
    <slot />
  </label>
</template>
