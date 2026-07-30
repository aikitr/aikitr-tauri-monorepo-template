<script setup lang="ts">
import type { DateValue } from "@internationalized/date"
import type { HTMLAttributes } from "vue"
import { CalendarIcon } from "@lucide/vue"
import { cn } from "../../lib/utils"
import { Button } from "../button"
import { PopoverTrigger } from "../popover"

const props = defineProps<{
  modelValue?: DateValue
  placeholder?: string
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <PopoverTrigger as-child>
    <Button
      variant="outline"
      data-slot="date-picker-input"
      :class="cn('w-full justify-start text-left font-normal', !props.modelValue && 'text-muted-foreground', props.class)"
    >
      <CalendarIcon class="mr-2 size-4" />
      {{ props.modelValue ? props.modelValue.toString() : props.placeholder ?? 'Pick a date' }}
    </Button>
  </PopoverTrigger>
</template>
