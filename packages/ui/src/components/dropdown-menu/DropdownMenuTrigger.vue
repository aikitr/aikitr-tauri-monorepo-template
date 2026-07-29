<script setup lang="ts">
import { DropdownMenuTrigger } from 'reka-ui';

interface Props {
  asChild?: boolean;
}
withDefaults(defineProps<Props>(), { asChild: true });
</script>

<template>
  <DropdownMenuTrigger :as-child="asChild">
    <slot />
  </DropdownMenuTrigger>
</template>
