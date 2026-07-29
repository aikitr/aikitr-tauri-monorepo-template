<script setup lang="ts">
import { computed, provide, type HTMLAttributes } from 'vue';
import { ToggleGroupRoot, type ToggleGroupRootEmits, type ToggleGroupRootProps } from 'reka-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { toggleVariants } from '../toggle/Toggle.vue';

export const toggleGroupVariants = cva(
  'flex items-center justify-center gap-1',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ToggleGroupVariants = VariantProps<typeof toggleGroupVariants>;

interface Props {
  class?: HTMLAttributes['class'];
  modelValue?: ToggleGroupRootProps['modelValue'];
  defaultValue?: ToggleGroupRootProps['defaultValue'];
  type?: 'single' | 'multiple';
  variant?: ToggleGroupVariants['variant'];
  size?: VariantProps<typeof toggleVariants>['size'];
  disabled?: boolean;
  rovingFocus?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'single',
  variant: 'default',
  size: 'default',
  disabled: false,
  rovingFocus: true,
});

const emit = defineEmits<ToggleGroupRootEmits>();

function onUpdateModelValue(value: string | string[]): void {
  emit('update:modelValue', value);
}

const classes = computed(() =>
  cn(toggleGroupVariants({ variant: props.variant }), props.class),
);

provide('toggleGroupVariant', props.variant);
provide('toggleGroupSize', props.size);
</script>

<template>
  <ToggleGroupRoot
    :class="classes"
    :type="type"
    :model-value="modelValue"
    :default-value="defaultValue"
    :disabled="disabled"
    :roving-focus="rovingFocus"
    @update:model-value="onUpdateModelValue"
  >
    <slot />
  </ToggleGroupRoot>
</template>
