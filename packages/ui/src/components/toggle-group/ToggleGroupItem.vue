<script setup lang="ts">
import { computed, inject, type HTMLAttributes } from 'vue';
import { ToggleGroupItem } from 'reka-ui';
import { cn } from '../../lib/utils';
import { toggleVariants } from '../toggle/Toggle.vue';

interface Props {
  class?: HTMLAttributes['class'];
  value: string;
  disabled?: boolean;
}

const props = defineProps<Props>();

const variant = inject<'default' | 'outline'>('toggleGroupVariant', 'default');
const size = inject<'default' | 'sm' | 'lg'>('toggleGroupSize', 'default');

const classes = computed(() =>
  cn(toggleVariants({ variant, size }), props.class),
);
</script>

<template>
  <ToggleGroupItem :class="classes" :value="value" :disabled="disabled">
    <slot />
  </ToggleGroupItem>
</template>
