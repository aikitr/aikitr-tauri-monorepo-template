<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { PopoverRoot } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}
const props = withDefaults(defineProps<Props>(), { modal: true });
const classes = computed(() => cn(props.class));

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();
</script>

<template>
  <PopoverRoot :open="open" :default-open="defaultOpen" :modal="modal" :class="classes" @update:open="(v) => emit('update:open', v)">
    <slot />
  </PopoverRoot>
</template>
