<script setup lang="ts">
import { TabsRoot, type TabsRootEmits, type TabsRootProps } from 'reka-ui';

interface Props extends TabsRootProps {}
const props = defineProps<Props>();

const emit = defineEmits<TabsRootEmits>();

function onUpdate(value: string): void {
  emit('update:modelValue', value);
}
</script>

<template>
  <TabsRoot v-bind="props" @update:model-value="onUpdate">
    <slot />
  </TabsRoot>
</template>
