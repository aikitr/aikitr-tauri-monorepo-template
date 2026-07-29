<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, type DialogRootProps } from 'reka-ui';

interface Props extends DialogRootProps {}
const props = defineProps<Props>();

const emit = defineEmits<DialogRootEmits>();

function onOpenChange(open: boolean): void {
  emit('update:open', open);
}
</script>

<template>
  <DialogRoot v-bind="props" @update:open="onOpenChange">
    <slot />
  </DialogRoot>
</template>
