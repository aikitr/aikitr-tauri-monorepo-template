<script setup lang="ts">
import { ContextMenuSub } from 'reka-ui';

interface Props {
  open?: boolean;
  defaultOpen?: boolean;
}
defineProps<Props>();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();
</script>

<template>
  <ContextMenuSub :open="open" :default-open="defaultOpen" @update:open="(v) => emit('update:open', v)">
    <slot />
  </ContextMenuSub>
</template>
