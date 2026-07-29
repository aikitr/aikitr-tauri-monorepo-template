<script setup lang="ts">
import { computed, inject, type ComputedRef, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const fieldContext = inject<{
  error: ComputedRef<string | undefined>;
} | null>('formFieldContext', null);

const errorMessage = computed(() => fieldContext?.error?.value);

const classes = computed(() => cn('text-[0.8rem] font-medium text-destructive', props.class));
</script>

<template>
  <p v-if="errorMessage" :class="classes">
    {{ errorMessage }}
  </p>
</template>
