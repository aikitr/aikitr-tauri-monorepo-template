<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { NavigationMenuLink } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  active?: boolean;
  asChild?: boolean;
}
const props = withDefaults(defineProps<Props>(), { active: false, asChild: false });
const classes = computed(() =>
  cn(
    'block select-none rounded-md p-3 text-sm no-underline outline-none transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    'focus:bg-accent focus:text-accent-foreground',
    props.active && 'bg-accent text-accent-foreground',
    props.class,
  ),
);
</script>

<template>
  <NavigationMenuLink :active="active" :as-child="asChild" :class="classes">
    <slot />
  </NavigationMenuLink>
</template>
