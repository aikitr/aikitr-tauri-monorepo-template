<script setup lang="ts">
import { AlertDialogRoot, type AlertDialogRootEmits, type AlertDialogRootProps } from 'reka-ui';

interface Props extends AlertDialogRootProps {}
const props = defineProps<Props>();

const emit = defineEmits<AlertDialogRootEmits>();

function onOpenChange(open: boolean): void {
  emit('update:open', open);
}
</script>

<template>
  <AlertDialogRoot v-bind="props" @update:open="onOpenChange">
    <slot />
  </AlertDialogRoot>
</template>
