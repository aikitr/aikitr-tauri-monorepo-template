<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { HoverCardRoot } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  open?: boolean;
  defaultOpen?: boolean;
  openDelay?: number;
  closeDelay?: number;
}
const props = withDefaults(defineProps<Props>(), {
  openDelay: 300,
  closeDelay: 100,
});
const classes = computed(() => cn(props.class));

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();
</script>

<template>
  <HoverCardRoot
    :open="open"
    :default-open="defaultOpen"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :class="classes"
    @update:open="(v) => emit('update:open', v)"
  >
    <slot />
  </HoverCardRoot>
</template>
