import { defineStore } from 'pinia'

import { mockTasks, mockUsers } from './app.mocks'

import type { AppActions, AppGetters, AppStore, Task, User } from './app.types'

export const useAppStore = defineStore<'app', AppStore, AppGetters, AppActions>('app', {
  state: () => ({
    tasks: mockTasks,
    users: mockUsers
  }),
  getters: {
    getTaskById() {
      return (taskId, userId) =>
        this.tasks.find(
          ({ id, assigneeId, authorId }) =>
            taskId === id && [authorId, assigneeId].some((x) => x === userId)
        ) as Task
    },
    getTasksByAuthorId() {
      return (userId) => this.tasks.filter(({ authorId }) => userId === authorId)
    },
    getTasksByAssigneeId() {
      return (userId) => this.tasks.filter(({ assigneeId }) => userId === assigneeId)
    },
    getTasksByUserId() {
      return (userId) =>
        this.tasks.filter(({ authorId, assigneeId }) =>
          [authorId, assigneeId].some((x) => x === userId)
        )
    },

    getUserById() {
      return (userId) => this.users.find(({ id }) => id === userId) as User
    }
  },
  actions: {
    createTask(data) {
      this.tasks.push({
        id: (this.tasks.at(-1)?.id ?? -1) + 1,
        ...data
      })
    },
    updateTask(taskId, data) {
      const task = this.tasks.find(({ id }) => taskId === id)

      if (task) {
        Object.keys(data).forEach((x) => {
          const key = x as unknown as keyof Task

          // Warning: not make typing safe.
          ;(task as any)[key] = data[key]
        })
      }
    },
    removeTask(taskId) {
      const index = this.tasks.findIndex(({ id }) => taskId === id)

      if (index > -1) this.tasks.splice(index, 1)
    },
    resolveTask(taskId) {
      const task = this.tasks.find(({ id }) => taskId === id)

      if (task) {
        task.resolved = true
      }
    }
  }
})
