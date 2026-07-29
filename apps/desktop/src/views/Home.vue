<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/app';
import { useSettingsStore } from '@/stores/settings';
import { useDarkMode } from '@aikitr/hooks';
import { Button, Switch } from '@aikitr/ui';
import { useToast } from '@aikitr/ui';

const appStore = useAppStore();
const { info, platform } = storeToRefs(appStore);
const settingsStore = useSettingsStore();
const { settings } = storeToRefs(settingsStore);
const { preference } = useDarkMode();
const toast = useToast();

function onClickPing(): void {
  toast.success('Pinged', 'Main window received the signal.');
}
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-8 p-6">
    <section class="space-y-2">
      <h1 class="text-3xl font-semibold tracking-tight">Welcome to Aikitr</h1>
      <p class="text-muted-foreground">
        An enterprise Tauri 2 + Vue 3 desktop application template.
      </p>
    </section>

    <section class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="rounded-lg border border-border bg-card p-4">
        <div class="text-xs uppercase text-muted-foreground">App</div>
        <div class="mt-1 text-lg font-semibold">{{ info?.name ?? 'Aikitr' }}</div>
        <div class="text-sm text-muted-foreground">v{{ info?.version ?? '0.0.0' }}</div>
      </div>
      <div class="rounded-lg border border-border bg-card p-4">
        <div class="text-xs uppercase text-muted-foreground">Platform</div>
        <div class="mt-1 text-lg font-semibold capitalize">{{ platform }}</div>
        <div class="text-sm text-muted-foreground">{{ info?.env }}</div>
      </div>
      <div class="rounded-lg border border-border bg-card p-4">
        <div class="text-xs uppercase text-muted-foreground">Locale</div>
        <div class="mt-1 text-lg font-semibold">{{ settings.locale }}</div>
        <div class="text-sm text-muted-foreground">Theme: {{ preference }}</div>
      </div>
    </section>

    <section class="rounded-lg border border-border bg-card p-6">
      <h2 class="mb-4 text-lg font-semibold">Quick actions</h2>
      <div class="flex flex-wrap gap-3">
        <Button @click="onClickPing">Trigger toast</Button>
        <Button variant="outline" @click="settings.setAutoUpdate(!settings.autoUpdate)">
          Toggle auto-update
        </Button>
        <Button variant="ghost" @click="settings.reset()">Reset settings</Button>
      </div>
    </section>

    <section class="rounded-lg border border-border bg-card p-6">
      <h2 class="mb-4 text-lg font-semibold">Preferences</h2>
      <div class="space-y-4">
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
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium">Auto-update</div>
            <div class="text-xs text-muted-foreground">Install updates automatically.</div>
          </div>
          <Switch
            :model-value="settings.autoUpdate"
            @update:model-value="(v) => settingsStore.setAutoUpdate(v)"
          />
        </div>
      </div>
    </section>
  </div>
</template>
