<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { ToggleRoot, type ToggleRootEmits, type ToggleRootProps } from 'reka-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-3',
        sm: 'h-8 px-2',
        lg: 'h-10 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ToggleVariants = VariantProps<typeof toggleVariants>;

interface Props {
  class?: HTMLAttributes['class'];
  modelValue?: ToggleRootProps['modelValue'];
  defaultValue?: ToggleRootProps['defaultValue'];
  variant?: ToggleVariants['variant'];
  size?: ToggleVariants['size'];
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
});

const emit = defineEmits<ToggleRootEmits>();

function onUpdatePressed(value: boolean): void {
  emit('update:modelValue', value);
}

const classes = computed(() =>
  cn(toggleVariants({ variant: props.variant, size: props.size }), props.class),
);
</script>

<template>
  <ToggleRoot
    :class="classes"
    :model-value="modelValue"
    :default-value="defaultValue"
    :disabled="disabled"
    @update:model-value="onUpdatePressed"
  >
    <slot />
  </ToggleRoot>
</template>
