<script setup lang="ts">
import BackwardButton from '@/components/BackwardButton.vue';
import { useRouter } from 'vue-router';
import TaskEditor from '@/components/TaskEditor.vue';
import { useAppStore } from '@/stores/app';

const store = useAppStore();
const router = useRouter();

const { params } = router.currentRoute.value;
const userId = Number(params.userId);
const taskId = Number(params.taskId);

const task = store.getTaskById(taskId, userId);
</script>

<template>
  <BackwardButton />

  <TaskEditor
    formName="Edit task"
    
    :task-id="taskId"
    :task-title="task.title"
    :task-description="task.description"

    :assignee-id="task.assigneeId"
    :user-id="userId"
  />
</template>
