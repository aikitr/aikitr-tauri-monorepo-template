<script setup lang="ts">
import { PopoverTrigger } from 'reka-ui';

interface Props {
  asChild?: boolean;
}
withDefaults(defineProps<Props>(), { asChild: true });
</script>

<template>
  <PopoverTrigger :as-child="asChild">
    <slot />
  </PopoverTrigger>
</template>
