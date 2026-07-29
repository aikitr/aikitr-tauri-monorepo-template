<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { NavigationMenuList } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();
const classes = computed(() =>
  cn(
    'group flex flex-1 list-none items-center justify-center gap-1',
    props.class,
  ),
);
</script>

<template>
  <NavigationMenuList :class="classes">
    <slot />
  </NavigationMenuList>
</template>
