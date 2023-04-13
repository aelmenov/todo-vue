<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader />

  <main class="xl:container xl:mx-auto px-5 pb-5 text-gray-700">
    <router-view class="view" />
  </main>
</template>
