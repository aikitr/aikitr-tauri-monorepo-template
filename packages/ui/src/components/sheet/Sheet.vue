<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, type DialogRootProps } from 'reka-ui';

interface Props extends DialogRootProps {}
const props = defineProps<Props>();

const emit = defineEmits<DialogRootEmits>();

function onUpdateOpen(value: boolean): void {
  emit('update:open', value);
}
</script>

<template>
  <DialogRoot v-bind="props" @update:open="onUpdateOpen">
    <slot />
  </DialogRoot>
</template>
