<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute, RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/app';
import { useSettingsStore } from '@/stores/settings';
import { Button, Separator } from '@aikitr/ui';
import ThemeToggle from '@/components/common/ThemeToggle.vue';

const route = useRoute();
const appStore = useAppStore();
const { info } = storeToRefs(appStore);
const { settings } = storeToRefs(useSettingsStore());

const breadcrumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean);
  return segments.length > 0 ? segments : ['home'];
});
</script>

<template>
  <div class="flex h-full flex-col bg-background text-foreground">
    <header
      class="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      data-tauri-drag-region
    >
      <div class="flex items-center gap-3">
        <div class="size-7 rounded-md bg-gradient-to-br from-primary to-primary/50" />
        <div class="text-sm font-semibold tracking-tight">Aikitr</div>
        <Separator orientation="vertical" class="h-5" />
        <nav class="flex items-center gap-1 text-sm text-muted-foreground">
          <RouterLink
            v-for="(item, i) in breadcrumbs"
            :key="item"
            :to="i === 0 ? '/' : `/${breadcrumbs.slice(0, i + 1).join('/')}`"
            class="rounded px-2 py-1 capitalize transition-colors hover:bg-accent hover:text-foreground"
          >
            {{ item }}
          </RouterLink>
        </nav>
      </div>
      <div class="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="sm" as="a" :href="`#/about`">About</Button>
      </div>
    </header>

    <main class="flex-1 overflow-auto">
      <RouterView v-slot="{ Component }">
        <Suspense>
          <component :is="Component" />
          <template #fallback>
            <div class="flex h-full items-center justify-center">
              <div class="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          </template>
        </Suspense>
      </RouterView>
    </main>

    <footer class="flex h-8 shrink-0 items-center justify-between border-t border-border px-4 text-xs text-muted-foreground">
      <span>v{{ info?.version ?? '0.0.0' }}</span>
      <span>{{ settings.locale }}</span>
    </footer>
  </div>
</template>
