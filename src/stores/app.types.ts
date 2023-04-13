export type Task = {
  id: number
  timestamp: number
  resolved: boolean

  authorId: number
  assigneeId: number

  title: string
  description: string
}

export type User = {
  id: number
  name: string
}

export type AppStore = {
  tasks: Task[]
  users: User[]
}

export type AppGetters = {
  getTaskById: () => (taskId: number, userId: number) => Task
  getTasksByAuthorId: () => (userId: number) => Task[]
  getTasksByAssigneeId: () => (userId: number) => Task[]
  getTasksByUserId: () => (userId: number) => Task[]
  getUserById: () => (userId: number) => User
}

export type AppActions = {
  createTask: (data: Omit<Task, 'id'>) => void
  updateTask: (taskId: number, data: Partial<Task>) => void
  resolveTask: (taskId: number) => void
  removeTask: (taskId: number) => void
}
