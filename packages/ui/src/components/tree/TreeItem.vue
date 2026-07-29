<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '../../lib/utils';
import type { TreeItemData } from './Tree.vue';

interface Props {
  class?: HTMLAttributes['class'];
  item: TreeItemData;
  expanded?: string[];
  selected?: string;
  depth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  expanded: () => [],
  selected: undefined,
  depth: 0,
});

const emit = defineEmits<{
  select: [id: string];
  toggle: [id: string];
}>();

const isExpanded = computed(() => props.expanded.includes(props.item.id));
const isSelected = computed(() => props.selected === props.item.id);
const hasChildren = computed(() => props.item.children && props.item.children.length > 0);

const itemClasses = computed(() =>
  cn(
    'flex items-center gap-1 rounded-md px-2 py-1.5 cursor-pointer hover:bg-accent hover:text-accent-foreground',
    isSelected.value && 'bg-accent text-accent-foreground',
    props.class,
  ),
);

const indentStyle = computed(() => ({
  paddingLeft: `${props.depth}rem`,
}));

function onClick(): void {
  emit('select', props.item.id);
  if (hasChildren.value) {
    emit('toggle', props.item.id);
  }
}

function onToggleClick(event: Event): void {
  event.stopPropagation();
  emit('toggle', props.item.id);
}
</script>

<template>
  <div role="treeitem" :aria-expanded="hasChildren ? isExpanded : undefined">
    <div :class="itemClasses" :style="indentStyle" @click="onClick">
      <button
        v-if="hasChildren"
        class="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm hover:bg-accent"
        @click="onToggleClick"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4 transition-transform"
          :class="{ 'rotate-90': isExpanded }"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
      <span v-else class="inline-flex h-4 w-4 shrink-0" />
      <span class="truncate">{{ item.label }}</span>
    </div>
    <div v-if="hasChildren && isExpanded" role="group">
      <TreeItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        :expanded="expanded"
        :selected="selected"
        :depth="depth + 1"
        @select="(id: string) => emit('select', id)"
        @toggle="(id: string) => emit('toggle', id)"
      />
    </div>
  </div>
</template>
