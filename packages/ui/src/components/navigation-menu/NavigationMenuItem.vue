<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { NavigationMenuItem } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  value?: string;
}
const props = defineProps<Props>();
const classes = computed(() => cn('relative', props.class));
</script>

<template>
  <NavigationMenuItem :value="value" :class="classes">
    <slot />
  </NavigationMenuItem>
</template>
