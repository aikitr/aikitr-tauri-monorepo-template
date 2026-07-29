<script setup lang="ts">
import { useDarkMode } from '@aikitr/hooks';
import { Tooltip, TooltipTrigger, TooltipContent, Button } from '@aikitr/ui';
import { computed } from 'vue';

const { isDark, toggle } = useDarkMode();

const label = computed(() => (isDark.value ? 'Switch to light mode' : 'Switch to dark mode'));
</script>

<template>
  <Tooltip>
    <TooltipTrigger :as-child="true">
      <Button variant="ghost" size="icon" :aria-label="label" @click="toggle">
        <span v-if="isDark" aria-hidden="true">🌙</span>
        <span v-else aria-hidden="true">☀️</span>
      </Button>
    </TooltipTrigger>
    <TooltipContent>{{ label }}</TooltipContent>
  </Tooltip>
</template>
