import { DAY } from '@/utils/date-time'

import type { Task, User } from './app.types'

export const mockUsers: User[] = [
  {
    id: 0,
    name: 'Egbert Warner'
  },
  {
    id: 1,
    name: 'Rosa Shortle'
  },
  {
    id: 2,
    name: 'Glen Mendez'
  },
  {
    id: 3,
    name: 'Drake Hammond'
  }
]

export const mockTasks: Task[] = [
  {
    id: 0,
    timestamp: Date.now() - DAY * 4,
    resolved: true,

    authorId: 0,
    assigneeId: 1,

    title: 'Prioritize',
    description:
      'Before you start keeping a to-do list, you need to prioritize. Mark the tasks that need to be done first. This will help you focus on the most important tasks and avoid wasting time on non-essential ones.'
  },
  {
    id: 1,
    timestamp: Date.now() - DAY * 2,
    resolved: false,

    authorId: 1,
    assigneeId: 0,

    title: 'Write down all tasks',
    description:
      "Write down all the tasks that need to be done. Don't try to remember them all in your head. This can lead to forgetting important things and stress. Write down all tasks, even the smallest ones."
  },
  {
    id: 2,
    timestamp: Date.now() - DAY,
    resolved: false,

    authorId: 0,
    assigneeId: 2,

    title: 'Break tasks into parts',
    description:
      'Big tasks can be overwhelming. Make them smaller and more manageable by breaking them into pieces. This will help you manage your time more efficiently and complete tasks gradually.'
  },
  {
    id: 3,
    timestamp: Date.now(),
    resolved: false,

    authorId: 3,
    assigneeId: 2,

    title: 'Update your to-do list daily',
    description:
      'Update your to-do list daily to stay on top of your tasks. Pay attention to priorities and schedule changes. This will help you stay on track and avoid missing important tasks.'
  }
]
