<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { TabsContent } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  value: string;
  forceMount?: boolean;
}
const props = withDefaults(defineProps<Props>(), { forceMount: false });
const classes = computed(() =>
  cn(
    'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    props.class,
  ),
);
</script>

<template>
  <TabsContent :value="value" :class="classes" :force-mount="forceMount">
    <slot />
  </TabsContent>
</template>
