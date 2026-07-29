<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { ContextMenuItem } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  textValue?: string;
  inset?: boolean;
}
const props = withDefaults(defineProps<Props>(), { disabled: false, inset: false });
const emit = defineEmits<{ select: [event: Event] }>();

const classes = computed(() =>
  cn(
    'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
    'focus:bg-accent focus:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    props.inset && 'pl-8',
    props.class,
  ),
);
</script>

<template>
  <ContextMenuItem
    :disabled="disabled"
    :text-value="textValue"
    :class="classes"
    @select="(e) => emit('select', e)"
  >
    <slot />
  </ContextMenuItem>
</template>
