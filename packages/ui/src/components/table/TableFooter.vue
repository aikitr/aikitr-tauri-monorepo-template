<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const classes = computed(() =>
  cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', props.class),
);
</script>

<template>
  <tfoot :class="classes">
    <slot />
  </tfoot>
</template>
