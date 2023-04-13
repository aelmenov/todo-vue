<script setup lang="ts">
import { computed } from 'vue'
import { RouteName } from '@/router'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

export interface Props {
  userId: number
  taskId: number
}

const props = defineProps<Props>()

const store = useAppStore()
const router = useRouter()

const task = computed(() => store.getTaskById(props.taskId, props.userId))

const getAuthorLabel = computed(() => (userId: number) => {
  if (props.userId === userId) {
    return "I'm author"
  } else {
    return `Author: ${store.getUserById(userId).name}`
  }
})

const getAssigneeLabel = computed(() => (userId: number) => {
  if (props.userId === userId) {
    return 'assigned to me'
  } else {
    return `assignee: ${store.getUserById(userId).name}`
  }
})

const handleTask = () =>
  router.push({
    name: RouteName.Task,
    params: {
      userId: props.userId,
      taskId: props.taskId
    }
  })
</script>

<template>
  <span class="cursor-pointer" @click="handleTask">
    <span class="font-bold inline-block mr-1">{{ task.title }}</span>
    <span class="inline-block" :class="{ 'text-gray-500': !task.resolved }">
      ({{ getAuthorLabel(task.authorId) }}, {{ getAssigneeLabel(task.assigneeId) }})
    </span>
  </span>
</template>
