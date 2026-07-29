<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const classes = computed(() => cn('-mx-1 h-px bg-border', props.class));
</script>

<template>
  <div :class="classes" role="separator" />
</template>
