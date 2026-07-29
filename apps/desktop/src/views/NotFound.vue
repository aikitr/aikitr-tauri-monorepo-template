<script setup lang="ts">
import { Button } from '@aikitr/ui';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
    <div class="text-7xl font-bold tracking-tighter">404</div>
    <p class="text-muted-foreground">The page you are looking for does not exist.</p>
    <Button @click="router.push('/')">Go home</Button>
  </div>
</template>
