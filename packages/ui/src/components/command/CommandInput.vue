<script setup lang="ts">
import { computed, type HTMLAttributes, inject, type Ref } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  placeholder?: string;
  modelValue?: string;
}
const props = withDefaults(defineProps<Props>(), { placeholder: 'Type a command or search...' });

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const filterValue = inject<Ref<string>>('command-filter');

const classes = computed(() =>
  cn(
    'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
    props.class,
  ),
);

function onInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  if (filterValue) filterValue.value = value;
  emit('update:modelValue', value);
}
</script>

<template>
  <div class="flex items-center border-b px-3" cmdk-input-wrapper="">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="mr-2 h-4 w-4 shrink-0 opacity-50"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
    <input
      :class="classes"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>
