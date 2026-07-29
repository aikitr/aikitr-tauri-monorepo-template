<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/app';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@aikitr/ui';

const { info, platform } = storeToRefs(useAppStore());
</script>

<template>
  <div class="mx-auto max-w-3xl space-y-6 p-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">About</h1>
      <p class="text-muted-foreground">Aikitr Desktop application information.</p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Application</CardTitle>
        <CardDescription>Build metadata and runtime information.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-muted-foreground">Name</span>
          <span class="font-medium">{{ info?.name }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Version</span>
          <span class="font-medium">{{ info?.version }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Environment</span>
          <span class="font-medium capitalize">{{ info?.env }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Platform</span>
          <span class="font-medium capitalize">{{ platform }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Locale</span>
          <span class="font-medium">{{ info?.locale }}</span>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
