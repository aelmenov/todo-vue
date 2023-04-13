<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import TaskName from './components/TaskName.vue';
import { RouteName } from '@/router';

const store = useAppStore();
const router = useRouter();
const userId = Number(router.currentRoute.value.params.userId);

const taskList = computed(() => store.getTasksByUserId(Number(userId)));

const handleCreateTask = () => router.push({ name: RouteName.TaskCreate, params: { userId } });
</script>

<template>
  <ul class="mb-5">
    <li
      v-for="task in taskList"
      :key="task.id"
      class="flex items-center mb-2"
      :class="{ 'text-gray-400': task.resolved }"
    >
      <Checkbox
        v-model="task.resolved"
        :binary="true"
        :disabled="task.resolved"
        class="mr-2"
      />

      <TaskName
        :user-id="userId"
        :task-id="task.id"
      />
    </li>
  </ul>

  <Button
    label="Create Task"
    icon="pi pi-plus"
    size="small"
    @click="handleCreateTask"
  />
</template>
