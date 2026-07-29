<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { RadioGroupItem, RadioGroupIndicator } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  value?: string;
  id?: string;
}
const props = withDefaults(defineProps<Props>(), { disabled: false });

const itemClasses = computed(() =>
  cn(
    'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow',
    'focus:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
    props.class,
  ),
);

const indicatorClasses = computed(() =>
  cn(
    'flex items-center justify-center',
  ),
);
</script>

<template>
  <RadioGroupItem :id="id" :disabled="disabled" :value="value" :class="itemClasses">
    <RadioGroupIndicator :class="indicatorClasses">
      <span class="h-2 w-2 rounded-full bg-current" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
