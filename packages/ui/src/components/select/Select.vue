<script setup lang="ts">
import { SelectRoot, type SelectRootEmits, type SelectRootProps } from 'reka-ui';

interface Props extends SelectRootProps {}
const props = defineProps<Props>();

const emit = defineEmits<SelectRootEmits>();

function onUpdateModelValue(value: string): void {
  emit('update:modelValue', value);
}

function onUpdateOpen(value: boolean): void {
  emit('update:open', value);
}
</script>

<template>
  <SelectRoot v-bind="props" @update:model-value="onUpdateModelValue" @update:open="onUpdateOpen">
    <slot />
  </SelectRoot>
</template>
