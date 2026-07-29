<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  modelValue?: boolean | 'indeterminate';
  disabled?: boolean;
  id?: string;
}
const props = withDefaults(defineProps<Props>(), { disabled: false });

const emit = defineEmits<{
  'update:modelValue': [value: boolean | 'indeterminate'];
}>();

function onUpdate(value: boolean | 'indeterminate'): void {
  emit('update:modelValue', value);
}

const rootClasses = computed(() =>
  cn(
    'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
    props.class,
  ),
);
</script>

<template>
  <CheckboxRoot
    :id="id"
    :model-value="modelValue"
    :disabled="disabled"
    :class="rootClasses"
    @update:model-value="onUpdate"
  >
    <CheckboxIndicator class="flex items-center justify-center text-current">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-3.5 w-3.5"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
