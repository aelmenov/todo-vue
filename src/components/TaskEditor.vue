<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import FormRow from '@/components/FormRow.vue';
import ButtonSet from '@/components/ButtonSet.vue';
import AutoComplete, { type AutoCompleteCompleteEvent } from 'primevue/autocomplete';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import Editor from 'primevue/editor';
import { RouteName } from '@/router';

export interface Props {
  formName: string;

  taskId?: number;
  taskTitle?: string;
  taskDescription?: string;

  assigneeId?: number;
  userId: number;
}

const props = defineProps<Props>();

const store = useAppStore();
const router = useRouter();

const users = store.users.map(x => x.name);

const title = ref(props.taskTitle ?? '');
const assignee = ref(store.getUserById(props.assigneeId ?? props.userId).name);
const filteredAssignee = ref<string[]>([]);
const description = ref(props.taskDescription ?? '');

const titleInvalid = ref(false);
const assigneeInvalid = ref(false);

const handleUserSearch = (e: AutoCompleteCompleteEvent) => {
  setTimeout(() => {
    if (!e.query.trim().length) {
      filteredAssignee.value = [...users];
    } else {
      filteredAssignee.value = users.filter(x => x.toLowerCase().startsWith(e.query.toLowerCase()));
    }
  }, 250);
};

const handleDone = () => {
  if (!title.value.trim()) {
    titleInvalid.value = true;

    return;
  }

  if (!assignee.value.trim()) {
    assigneeInvalid.value = true;

    return;
  }

  if (props.taskId) {
    store.updateTask(props.taskId, {
      assigneeId: store.users.find(x => x.name === assignee.value)?.id ?? props.userId,

      title: title.value,
      description: description.value,
    });

    router.push({
      name: RouteName.Task,
      params: {
        userId: props.userId,
        taskId: props.taskId,
      }
    });
  } else {
    store.createTask({
      timestamp: Date.now(),
      resolved: false,
    
      authorId: props.userId,
      assigneeId: store.users.find(x => x.name === assignee.value)?.id ?? props.userId,
    
      title: title.value,
      description: description.value,
    });

    router.push({ name: RouteName.User, params: { userId: props.userId } })
  }
}

const handleRemove = () => {
  if (props.taskId) {
    store.removeTask(props.taskId);

    router.push({ name: RouteName.User, params: { userId: props.userId } });
  }
}
</script>

<template>
  <form @submit.prevent>
    <h2 class="w-full mb-7 mx-3 text-3xl font-bold">{{ formName }}</h2>

    <FormRow
      label="Title"
      for-id="title"
      has-input
    >
      <InputText
        type="text"
        v-model="title"
        class="p-inputtext-sm w-full"
        :class="{ 'p-invalid': titleInvalid }"
      />
    </FormRow>

    <FormRow
      label="Assignee"
      for-id="assignee"
      has-input
    >
      <AutoComplete
        v-model="assignee"
        class="p-inputtext-sm"
        :class="{ 'p-invalid': assigneeInvalid }"
        :suggestions="filteredAssignee"
        @complete="handleUserSearch"
        forceSelection
        dropdown
      />
    </FormRow>

    <Editor
      v-model="description"
      editorStyle="height: 320px"
      class="mb-5"
    >
      <template v-slot:toolbar>
        <span class="ql-formats">
            <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
            <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
            <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
        </span>
      </template>
    </Editor>

    <ButtonSet
      :create="!taskId"
      :edit="!!taskId"

      @remove="handleRemove"
      @done="handleDone"
    />
  </form>
</template>