<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';
import { RouterLink } from 'vue-router';

interface Props {
  class?: HTMLAttributes['class'];
  asChild?: boolean;
  to?: string;
  href?: string;
}
const props = withDefaults(defineProps<Props>(), { asChild: false });

const classes = computed(() => cn('transition-colors hover:text-foreground', props.class));
</script>

<template>
  <RouterLink v-if="props.to" :to="props.to" :class="classes">
    <slot />
  </RouterLink>
  <a v-else-if="props.href" :href="props.href" :class="classes">
    <slot />
  </a>
  <span v-else :class="classes">
    <slot />
  </span>
</template>
