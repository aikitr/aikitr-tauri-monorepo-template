<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { RadioGroupRoot } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  modelValue?: string;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  orientation: 'vertical',
});
const classes = computed(() =>
  cn(
    'grid gap-2',
    props.orientation === 'vertical' && 'grid-cols-1',
    props.orientation === 'horizontal' && 'grid-flow-col',
    props.class,
  ),
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <RadioGroupRoot
    :model-value="modelValue"
    :disabled="disabled"
    :orientation="orientation"
    :class="classes"
    @update:model-value="(v) => emit('update:modelValue', v)"
  >
    <slot />
  </RadioGroupRoot>
</template>
