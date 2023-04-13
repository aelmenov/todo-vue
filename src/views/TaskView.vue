<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import AccessDenied from '@/components/AccessDenied.vue';
import BackwardButton from '@/components/BackwardButton.vue';
import FormRow from '@/components/FormRow.vue';
import { timestampToDateString } from '@/utils/date-time';
import ButtonSet from '@/components/ButtonSet.vue';
import { RouteName } from '@/router';

const store = useAppStore();
const router = useRouter();

const { params } = router.currentRoute.value;
const userId = Number(params.userId);
const taskId = Number(params.taskId);

const task = computed(() => store.getTaskById(taskId, userId));

const date = timestampToDateString(task.value.timestamp);
const status = computed(() => task.value.resolved ? 'Resolved' : 'Work in Progress');
const author = computed(() => store.getUserById(task.value.authorId).name);
const assignee = computed(() => store.getUserById(task.value.assigneeId).name);

const canResolve = computed(() => !task.value.resolved && task.value.assigneeId === userId);
const canEdit = computed(() => !task.value.resolved && task.value.authorId === userId);

const handleResolve = () => store.resolveTask(task.value.id);
const handleRemove = () => {
  store.removeTask(task.value.id);

  router.push({ name: RouteName.User, params: { userId } });
}
const handleEdit = () => router.push({
  name: RouteName.TaskEdit,
  params: {
    userId,
    taskId: task.value.id,
  }
});
</script>

<template>
  <BackwardButton />
  <AccessDenied v-if="!task" />

  <form v-else @submit.prevent>
    <h2 class="w-full mb-2 mx-3 text-3xl font-bold">{{ task.title }}</h2>

    <FormRow label="Status">{{ status }}</FormRow>
    <FormRow label="Author">{{ author }}</FormRow>
    <FormRow label="Assignee">{{ assignee }}</FormRow>
    <FormRow label="Creation date">{{ date }}</FormRow>

    <article class="mb-5 mx-3" v-html="task.description" />

    <ButtonSet
      :can-resolve="canResolve"
      :can-edit="canEdit"
      :can-remove="canEdit"

      @resolve="handleResolve"
      @edit="handleEdit"
      @remove="handleRemove"
    />
  </form>
</template>
