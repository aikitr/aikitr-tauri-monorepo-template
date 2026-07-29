<script setup lang="ts">
import { DialogClose } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: string;
  asChild?: boolean;
}
const props = withDefaults(defineProps<Props>(), { asChild: true });
</script>

<template>
  <DialogClose :as-child="asChild" :class="cn('absolute right-4 top-4', props.class)">
    <slot />
  </DialogClose>
</template>
