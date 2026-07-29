<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  value?: string;
}
const props = withDefaults(defineProps<Props>(), { disabled: false });

const emit = defineEmits<{
  select: [value: string];
}>();

const classes = computed(() =>
  cn(
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
    'aria-selected:bg-accent aria-selected:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    'hover:bg-accent hover:text-accent-foreground',
    props.class,
  ),
);

function onSelect(): void {
  if (!props.disabled && props.value) {
    emit('select', props.value);
  }
}
</script>

<template>
  <div :class="classes" role="option" :data-disabled="disabled ? '' : undefined" @click="onSelect">
    <slot />
  </div>
</template>
