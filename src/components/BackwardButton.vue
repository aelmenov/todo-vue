<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import { RouteName } from '@/router';

const router = useRouter();
const { userId } = router.currentRoute.value.params;

const handleBackward = () => router.push({ name: RouteName.User, params: { userId } });
</script>

<template>
  <Button
    severity="secondary"
    icon="pi pi-arrow-left"
    text
    @click="handleBackward"
  />
</template>