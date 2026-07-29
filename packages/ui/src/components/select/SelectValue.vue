<script setup lang="ts">
import { SelectValue } from 'reka-ui';

interface Props {
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
});
</script>

<template>
  <SelectValue :placeholder="placeholder" />
</template>
