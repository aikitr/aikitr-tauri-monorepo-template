<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { ProgressRoot, ProgressIndicator } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  modelValue?: number;
  max?: number;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  max: 100,
});

const rootClasses = computed(() =>
  cn(
    'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
    props.class,
  ),
);

const indicatorClasses = computed(() =>
  cn(
    'h-full w-full flex-1 bg-primary transition-all',
  ),
);

const percentage = computed(() =>
  props.max > 0 ? Math.min(Math.max((props.modelValue / props.max) * 100, 0), 100) : 0,
);
</script>

<template>
  <ProgressRoot :model-value="modelValue" :max="max" :class="rootClasses">
    <ProgressIndicator
      :class="indicatorClasses"
      :style="{ transform: `translateX(-${100 - percentage}%)` }"
    />
  </ProgressRoot>
</template>
