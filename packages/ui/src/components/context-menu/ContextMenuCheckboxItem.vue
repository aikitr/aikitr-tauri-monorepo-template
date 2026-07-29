<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { ContextMenuCheckboxItem } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  textValue?: string;
  checked?: boolean | 'indeterminate';
}
const props = withDefaults(defineProps<Props>(), { disabled: false });
const emit = defineEmits<{
  select: [event: Event];
  'update:checked': [value: boolean];
}>();

const classes = computed(() =>
  cn(
    'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
    'focus:bg-accent focus:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    props.class,
  ),
);
</script>

<template>
  <ContextMenuCheckboxItem
    :disabled="disabled"
    :text-value="textValue"
    :checked="checked"
    :class="classes"
    @select="(e) => emit('select', e)"
    @update:checked="(v) => emit('update:checked', v)"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
    <slot />
  </ContextMenuCheckboxItem>
</template>
