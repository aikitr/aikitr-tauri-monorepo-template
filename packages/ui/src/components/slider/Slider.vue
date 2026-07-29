<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  modelValue?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  orientation: 'horizontal',
});

const emit = defineEmits<{
  'update:modelValue': [value: number[]];
}>();

function onUpdateModelValue(value: number[]): void {
  emit('update:modelValue', value);
}

const rootClasses = computed(() =>
  cn(
    'relative flex w-full touch-none select-none items-center',
    orientation === 'vertical' && 'flex-col h-full w-auto',
    props.class,
  ),
);

const orientation = computed(() => props.orientation);
</script>

<template>
  <SliderRoot
    :class="rootClasses"
    :model-value="modelValue"
    :default-value="defaultValue"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :orientation="orientation"
    @update:model-value="onUpdateModelValue"
  >
    <SliderTrack class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderRange class="absolute h-full bg-primary" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, i) in modelValue ?? defaultValue ?? [0]"
      :key="i"
      class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderRoot>
</template>
