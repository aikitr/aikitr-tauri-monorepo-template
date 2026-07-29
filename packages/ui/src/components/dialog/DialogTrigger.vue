<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { DialogTrigger } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  asChild?: boolean;
}
const props = withDefaults(defineProps<Props>(), { asChild: false });
const classes = computed(() => cn(props.class));
</script>

<template>
  <DialogTrigger :as-child="asChild" :class="classes">
    <slot />
  </DialogTrigger>
</template>
