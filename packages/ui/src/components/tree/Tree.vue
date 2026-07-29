<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';
import TreeItem from './TreeItem.vue';

export interface TreeItemData {
  id: string;
  label: string;
  children?: TreeItemData[];
}

interface Props {
  class?: HTMLAttributes['class'];
  items: TreeItemData[];
  expanded?: string[];
  selected?: string;
}

const props = withDefaults(defineProps<Props>(), {
  expanded: () => [],
  selected: undefined,
});

const emit = defineEmits<{
  select: [id: string];
  toggle: [id: string];
}>();

function onSelect(id: string): void {
  emit('select', id);
}

function onToggle(id: string): void {
  emit('toggle', id);
}

const classes = computed(() =>
  cn('text-sm', props.class),
);
</script>

<template>
  <div role="tree" :class="classes">
    <TreeItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :expanded="expanded"
      :selected="selected"
      :depth="0"
      @select="onSelect"
      @toggle="onToggle"
    />
  </div>
</template>
