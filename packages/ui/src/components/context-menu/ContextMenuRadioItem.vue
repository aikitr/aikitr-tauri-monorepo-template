<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { ContextMenuRadioItem } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  textValue?: string;
  value?: string;
}
const props = withDefaults(defineProps<Props>(), { disabled: false });
const emit = defineEmits<{ select: [event: Event] }>();

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
  <ContextMenuRadioItem
    :disabled="disabled"
    :text-value="textValue"
    :value="value"
    :class="classes"
    @select="(e) => emit('select', e)"
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
        class="h-2 w-2 fill-current"
      >
        <circle cx="12" cy="12" r="6" />
      </svg>
    </span>
    <slot />
  </ContextMenuRadioItem>
</template>
