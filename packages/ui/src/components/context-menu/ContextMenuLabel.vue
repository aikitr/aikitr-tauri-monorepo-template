<script setup lang="ts">
import { ContextMenuLabel } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: string;
  inset?: boolean;
}
const props = withDefaults(defineProps<Props>(), { inset: false });
</script>

<template>
  <ContextMenuLabel
    :class="cn('px-2 py-1.5 text-sm font-semibold', props.inset && 'pl-8', props.class)"
  >
    <slot />
  </ContextMenuLabel>
</template>
