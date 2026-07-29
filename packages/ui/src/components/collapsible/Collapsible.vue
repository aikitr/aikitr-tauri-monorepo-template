<script setup lang="ts">
import { CollapsibleRoot, type CollapsibleRootEmits, type CollapsibleRootProps } from 'reka-ui';

interface Props extends CollapsibleRootProps {}
const props = defineProps<Props>();

const emit = defineEmits<CollapsibleRootEmits>();

function onUpdateOpen(value: boolean): void {
  emit('update:open', value);
}
</script>

<template>
  <CollapsibleRoot v-bind="props" @update:open="onUpdateOpen">
    <slot />
  </CollapsibleRoot>
</template>
