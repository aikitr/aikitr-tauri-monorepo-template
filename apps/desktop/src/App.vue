<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useDarkMode } from '@aikitr/hooks';
import { Toaster } from '@aikitr/ui';
import { logger } from './services/logger';

const { isDark } = useDarkMode();

onMounted(() => {
  logger.debug('app mounted');
});
</script>

<template>
  <div class="h-full" :class="{ dark: isDark }">
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <Suspense :key="route.path">
          <component :is="Component" />
          <template #fallback>
            <div class="flex h-full items-center justify-center">
              <div class="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          </template>
        </Suspense>
      </Transition>
    </RouterView>
    <Toaster />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 120ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
