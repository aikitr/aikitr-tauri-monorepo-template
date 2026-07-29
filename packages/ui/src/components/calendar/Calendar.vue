<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import {
  CalendarRoot,
  CalendarHeader,
  CalendarHeading,
  CalendarGrid,
  CalendarGridHead,
  CalendarGridBody,
  CalendarCell,
  CalendarCellTrigger,
  CalendarPrevButton,
  CalendarNextButton,
  type CalendarRootEmits,
  type CalendarRootProps,
} from 'reka-ui';
import { cn } from '../../lib/utils';
import { valueUpdater } from '../../lib/utils';

interface Props extends CalendarRootProps {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const emit = defineEmits<CalendarRootEmits>();

function onUpdateModelValue(value: unknown): void {
  emit('update:modelValue', valueUpdater(value, props.modelValue as Date | Date[] | undefined));
}

const rootClasses = computed(() => cn('p-3', props.class));

const cellClasses =
  'h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20';

const cellTriggerClasses = computed(() =>
  cn(
    'inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md text-sm font-normal transition-colors',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground',
    'data-[today]:bg-accent data-[today]:text-accent-foreground',
    'data-[outside-view]:text-muted-foreground data-[outside-view]:opacity-50',
    'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
  ),
);

const weekDayClasses = 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]';
</script>

<template>
  <CalendarRoot v-bind="props" :class="rootClasses" @update:model-value="onUpdateModelValue">
    <CalendarHeader class="relative flex w-full items-center justify-between pt-1">
      <CalendarHeading class="text-sm font-medium" />
      <div class="flex items-center gap-1">
        <CalendarPrevButton
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </CalendarPrevButton>
        <CalendarNextButton
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </CalendarNextButton>
      </div>
    </CalendarHeader>
    <CalendarGrid class="w-full border-collapse space-y-1">
      <CalendarGridHead>
        <CalendarCell
          v-for="day in weekDays || ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']"
          :key="day"
          :class="weekDayClasses"
        >
          {{ day }}
        </CalendarCell>
      </CalendarGridHead>
      <CalendarGridBody>
        <template #default="{ weeks }">
          <CalendarCell
            v-for="week in weeks"
            :key="week"
            class="flex w-full mt-2"
          >
            <CalendarCell
              v-for="day in week"
              :key="day.date.toString()"
              :class="cellClasses"
            >
              <CalendarCellTrigger :day="day" :class="cellTriggerClasses" />
            </CalendarCell>
          </CalendarCell>
        </template>
      </CalendarGridBody>
    </CalendarGrid>
  </CalendarRoot>
</template>
