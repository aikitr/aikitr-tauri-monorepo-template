<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { ContextMenuRadioGroup } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  modelValue?: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
const classes = computed(() => cn(props.class));
</script>

<template>
  <ContextMenuRadioGroup
    :model-value="modelValue"
    :class="classes"
    @update:model-value="(v) => emit('update:modelValue', v)"
  >
    <slot />
  </ContextMenuRadioGroup>
</template>
