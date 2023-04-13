<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import TaskName from './components/TaskName.vue'
import { RouteName } from '@/router'
import Toolbar from 'primevue/toolbar'

const store = useAppStore()
const router = useRouter()
const userId = Number(router.currentRoute.value.params.userId)

const enum Filter {
  My,
  Authored,
  Assigned
}

const filteredTasks = ref(store.getTasksByUserId(userId))
const filter = ref(Filter.My)

const handleCreateTask = () => router.push({ name: RouteName.TaskCreate, params: { userId } })

const handleMyFilter = () => {
  filter.value = Filter.My
  filteredTasks.value = store.getTasksByUserId(userId)
}

const handleAuthoredFilter = () => {
  filter.value = Filter.Authored
  filteredTasks.value = store.getTasksByAuthorId(userId)
}

const handleAssigneedFilter = () => {
  filter.value = Filter.Assigned
  filteredTasks.value = store.getTasksByAssigneeId(userId)
}
</script>

<template>
  <Toolbar class="mb-5">
    <template #start>
      <Button label="New" icon="pi pi-plus" size="small" @click="handleCreateTask" />

      <i class="pi pi-bars p-toolbar-separator mr-2" />

      <span class="p-buttonset">
        <Button
          label="My Tasks"
          size="small"
          :disabled="filter === Filter.My"
          severity="secondary"
          @click="handleMyFilter"
        />

        <Button
          label="Created by Me"
          size="small"
          severity="secondary"
          :disabled="filter === Filter.Authored"
          @click="handleAuthoredFilter"
        />

        <Button
          label="Assigned to Me"
          size="small"
          severity="secondary"
          :disabled="filter === Filter.Assigned"
          @click="handleAssigneedFilter"
        />
      </span>
    </template>
  </Toolbar>

  <ul class="mb-5">
    <li
      v-for="task in filteredTasks"
      :key="task.id"
      class="flex items-center mb-2"
      :class="{ 'text-gray-400': task.resolved }"
    >
      <Checkbox v-model="task.resolved" :binary="true" :disabled="task.resolved" class="mr-2" />

      <TaskName :user-id="userId" :task-id="task.id" />
    </li>
  </ul>
</template>
