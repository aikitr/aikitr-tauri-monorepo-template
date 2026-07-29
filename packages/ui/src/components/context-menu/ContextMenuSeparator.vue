<script setup lang="ts">
import { ContextMenuSeparator } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: string;
}
const props = defineProps<Props>();
</script>

<template>
  <ContextMenuSeparator :class="cn('-mx-1 my-1 h-px bg-border', props.class)" />
</template>
