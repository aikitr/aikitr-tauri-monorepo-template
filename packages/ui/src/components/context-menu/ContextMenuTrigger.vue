<script setup lang="ts">
import { ContextMenuTrigger } from 'reka-ui';

interface Props {
  asChild?: boolean;
}
withDefaults(defineProps<Props>(), { asChild: true });
</script>

<template>
  <ContextMenuTrigger :as-child="asChild">
    <slot />
  </ContextMenuTrigger>
</template>
