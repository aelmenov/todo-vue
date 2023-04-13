<script setup lang="ts">
import BackwardButton from '@/components/BackwardButton.vue';
import { useRouter } from 'vue-router';
import TaskEditor from '@/components/TaskEditor.vue';

const router = useRouter();

const userId = Number(router.currentRoute.value.params.userId);
</script>

<template>
  <BackwardButton />

  <TaskEditor
    formName="Create a new task"
    :user-id="userId"
  />
</template>
