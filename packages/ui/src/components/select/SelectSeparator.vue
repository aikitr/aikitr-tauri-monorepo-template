<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { SelectSeparator } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const classes = computed(() =>
  cn('-mx-1 my-1 h-px bg-muted', props.class),
);
</script>

<template>
  <SelectSeparator :class="classes" />
</template>
