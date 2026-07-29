<script setup lang="ts">
import { computed, provide, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  name: string;
  modelValue?: unknown;
  error?: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  'update:modelValue': [value: unknown];
}>();

const classes = computed(() => cn('space-y-2', props.class));

provide('formFieldContext', {
  name: computed(() => props.name),
  error: computed(() => props.error),
  modelValue: computed(() => props.modelValue),
  updateModelValue: (value: unknown) => emit('update:modelValue', value),
});
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
