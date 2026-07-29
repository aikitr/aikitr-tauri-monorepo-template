<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { SwitchRoot, SwitchThumb } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  modelValue?: boolean;
  disabled?: boolean;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), { disabled: false });

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

function onUpdate(v: boolean): void {
  emit('update:modelValue', v);
}

const rootClasses = computed(() =>
  cn(
    'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
    props.class,
  ),
);

const thumbClasses = computed(() =>
  cn(
    'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform',
    'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
  ),
);
</script>

<template>
  <SwitchRoot
    :id="id"
    :model-value="modelValue"
    :disabled="disabled"
    :class="rootClasses"
    @update:model-value="onUpdate"
  >
    <SwitchThumb :class="thumbClasses" />
  </SwitchRoot>
</template>
