<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { NavigationMenuRoot } from 'reka-ui';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  modelValue?: string;
  defaultValue?: string;
  orientation?: 'horizontal' | 'vertical';
}
const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
});
const classes = computed(() =>
  cn(
    'relative z-10 flex flex-1 items-center justify-center',
    props.orientation === 'vertical' && 'flex-col',
    props.class,
  ),
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <NavigationMenuRoot
    :model-value="modelValue"
    :default-value="defaultValue"
    :orientation="orientation"
    :class="classes"
    @update:model-value="(v) => emit('update:modelValue', v)"
  >
    <slot />
    <div class="absolute bottom-0 left-0 h-2.5 w-full flex justify-center">
      <slot name="viewport" />
    </div>
  </NavigationMenuRoot>
</template>
