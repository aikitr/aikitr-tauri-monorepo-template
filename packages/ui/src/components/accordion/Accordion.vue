<script setup lang="ts">
import { AccordionRoot, type AccordionRootEmits, type AccordionRootProps } from 'reka-ui';

interface Props extends AccordionRootProps {}
const props = defineProps<Props>();

const emit = defineEmits<AccordionRootEmits>();

function onUpdateModelValue(value: string | string[]): void {
  emit('update:modelValue', value);
}
</script>

<template>
  <AccordionRoot v-bind="props" @update:model-value="onUpdateModelValue">
    <slot />
  </AccordionRoot>
</template>
