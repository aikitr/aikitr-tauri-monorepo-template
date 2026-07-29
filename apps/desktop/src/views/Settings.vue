<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '@/stores/settings';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Label, Input, Switch, Separator } from '@aikitr/ui';
import { useDarkMode } from '@aikitr/hooks';
import { logger } from '@/services/logger';

const settingsStore = useSettingsStore();
const { settings } = storeToRefs(settingsStore);
const { preference } = useDarkMode();

function onFontSizeChange(e: Event): void {
  const v = Number((e.target as HTMLInputElement).value);
  settingsStore.setFontSize(v);
  logger.debug('font size changed', { v });
}
</script>

<template>
  <div class="mx-auto max-w-3xl space-y-6 p-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">Settings</h1>
      <p class="text-muted-foreground">Configure your Aikitr experience.</p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Theme and typography.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Label for="theme-pref">Theme</Label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="opt in (['light', 'dark', 'system'] as const)"
              :key="opt"
              class="rounded-md border border-border bg-background px-3 py-2 text-sm capitalize transition-colors hover:bg-accent"
              :class="{ 'ring-2 ring-ring': preference === opt }"
              @click="preference = opt"
            >
              {{ opt }}
            </button>
          </div>
        </div>
        <Separator />
        <div class="space-y-2">
          <Label for="font-size">Font size — {{ settings.fontSize }}px</Label>
          <input
            id="font-size"
            type="range"
            min="10"
            max="24"
            :value="settings.fontSize"
            class="w-full"
            @input="onFontSizeChange"
          />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Locale</CardTitle>
        <CardDescription>Language and region.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Label for="locale">Language</Label>
          <select
            id="locale"
            :value="settings.locale"
            class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
            @change="(e) => settingsStore.setLocale(((e.target as HTMLSelectElement).value) as typeof settings.locale)"
          >
            <option value="en-US">English (United States)</option>
            <option value="zh-CN">中文 (中国)</option>
          </select>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Updates & privacy</CardTitle>
        <CardDescription>Control automatic updates and telemetry.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium">Automatic updates</div>
            <div class="text-xs text-muted-foreground">Download and install updates silently.</div>
          </div>
          <Switch
            :model-value="settings.autoUpdate"
            @update:model-value="(v) => settingsStore.setAutoUpdate(v)"
          />
        </div>
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium">Send telemetry</div>
            <div class="text-xs text-muted-foreground">Help improve the product.</div>
          </div>
          <Switch
            :model-value="settings.sendTelemetry"
            @update:model-value="(v) => settingsStore.setSendTelemetry(v)"
          />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>API base URL</CardTitle>
        <CardDescription>Override the backend endpoint.</CardDescription>
      </CardHeader>
      <CardContent>
        <Input :model-value="String(import.meta.env.VITE_API_BASE_URL ?? '')" readonly />
      </CardContent>
    </Card>
  </div>
</template>
