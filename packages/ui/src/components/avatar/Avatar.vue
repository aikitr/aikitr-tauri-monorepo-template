<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { AvatarRoot } from 'reka-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const avatarSizeVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type AvatarSizeVariants = VariantProps<typeof avatarSizeVariants>;

interface Props {
  class?: HTMLAttributes['class'];
  size?: AvatarSizeVariants['size'];
}
const props = withDefaults(defineProps<Props>(), { size: 'md' });

const classes = computed(() => cn(avatarSizeVariants({ size: props.size }), props.class));
</script>

<template>
  <AvatarRoot :class="classes">
    <slot />
  </AvatarRoot>
</template>
