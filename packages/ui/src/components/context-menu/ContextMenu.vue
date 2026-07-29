<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { ContextMenuRoot } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}
const props = withDefaults(defineProps<Props>(), { modal: true });
const classes = computed(() => cn(props.class));
</script>

<template>
  <ContextMenuRoot :open="open" :default-open="defaultOpen" :modal="modal" :class="classes">
    <slot />
  </ContextMenuRoot>
</template>
