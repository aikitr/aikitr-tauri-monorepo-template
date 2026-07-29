<script setup lang="ts">
import { TooltipProvider } from 'reka-ui';

interface Props {
  delayDuration?: number;
  skipDelayDuration?: number;
}
withDefaults(defineProps<Props>(), { delayDuration: 200, skipDelayDuration: 0 });
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration" :skip-delay-duration="skipDelayDuration">
    <slot />
  </TooltipProvider>
</template>
