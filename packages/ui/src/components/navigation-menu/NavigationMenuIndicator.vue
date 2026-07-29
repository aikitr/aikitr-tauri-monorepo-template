<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { NavigationMenuIndicator } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();
const classes = computed(() =>
  cn(
    'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
    'data-[state=visible]:animate-in data-[state=hidden]:animate-out',
    'data-[state=hidden]:fade-out data-[state=visible]:fade-in',
    props.class,
  ),
);
</script>

<template>
  <NavigationMenuIndicator :class="classes">
    <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuIndicator>
</template>
