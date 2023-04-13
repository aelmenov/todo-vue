import { describe, it, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '../app'
import { mockTasks, mockUsers } from '../app.mocks'
import type { Task } from '../app.types'

describe('app store', () => {
  let store: ReturnType<typeof useAppStore> | null = null

  const CURRENT_USER = 0
  const UNKNOWN_USER = 5

  beforeEach(() => {
    setActivePinia(createPinia())

    store = useAppStore()
  })

  it('initializes with correct values', ({ expect }) => {
    expect(store?.tasks).toStrictEqual(mockTasks)
    expect(store?.users).toStrictEqual(mockUsers)
  })

  it('getTaskById returns task for current user', ({ expect }) => {
    const id = 0
    const result = store?.getTaskById(id, CURRENT_USER)
    const expected = mockTasks[0]

    expect(result).toStrictEqual(expected)
  })

  it('getTaskById returns undefined for unknown user', ({ expect }) => {
    const id = 0
    const result = store?.getTaskById(id, UNKNOWN_USER)

    expect(result).toBeUndefined()
  })

  it('getTasksByAuthorId returns tasks where author is current user', ({ expect }) => {
    const result = store?.getTasksByAuthorId(CURRENT_USER)
    const expected = mockTasks.filter(({ authorId }) => authorId === CURRENT_USER)

    expect(result).toStrictEqual(expected)
  })

  it('getTasksByAuthorId returns empty array for unknown user', ({ expect }) => {
    const result = store?.getTasksByAuthorId(UNKNOWN_USER)
    const expected: Task[] = []

    expect(result).toStrictEqual(expected)
  })

  it('getTasksByAssigneeId returns tasks where assignee is current user', ({ expect }) => {
    const result = store?.getTasksByAssigneeId(CURRENT_USER)
    const expected = mockTasks.filter(({ assigneeId }) => assigneeId === CURRENT_USER)

    expect(result).toStrictEqual(expected)
  })

  it('getTasksByAssigneeId returns empty array for unknown user', ({ expect }) => {
    const result = store?.getTasksByAssigneeId(UNKNOWN_USER)
    const expected: Task[] = []

    expect(result).toStrictEqual(expected)
  })

  it('getTasksByUserId returns tasks where assignee or author is current user', ({ expect }) => {
    const result = store?.getTasksByUserId(CURRENT_USER)
    const expected = mockTasks.filter(({ authorId, assigneeId }) =>
      [authorId, assigneeId].some((x) => x === CURRENT_USER)
    )

    expect(result).toStrictEqual(expected)
  })

  it('getTasksByUserId returns empty array for unknown user', ({ expect }) => {
    const result = store?.getTasksByUserId(UNKNOWN_USER)
    const expected: Task[] = []

    expect(result).toStrictEqual(expected)
  })

  it('getUserById returns user by id', ({ expect }) => {
    const result = store?.getUserById(CURRENT_USER)
    const expected = mockUsers[CURRENT_USER]

    expect(result).toStrictEqual(expected)
  })

  it('getUserById returns undefined for unknown user', ({ expect }) => {
    const result = store?.getUserById(UNKNOWN_USER)

    expect(result).toBeUndefined()
  })

  it('createTask add new task to store', ({ expect }) => {
    const temp: Omit<Task, 'id'> = {
      assigneeId: 0,
      authorId: 0,
      description: 'Test',
      resolved: false,
      timestamp: Date.now(),
      title: 'Test'
    }
    const newId = (store?.tasks.at(-1)?.id ?? -1) + 1

    store?.createTask(temp)

    const result = store?.tasks.at(-1)
    const expected = { id: newId, ...temp }

    expect(result).toStrictEqual(expected)
  })

  it('updateTask updates data in task', ({ expect }) => {
    const id = 0
    const temp: Partial<Task> = {
      title: 'Test'
    }

    store?.updateTask(id, temp)

    const result = store?.tasks[id]
    const expected = { ...mockTasks[id], ...temp }

    expect(result).toStrictEqual(expected)
  })

  it('resolveTask change task status', ({ expect }) => {
    const id = 1

    store?.resolveTask(id)

    const result = store?.tasks[id]
    const expected = { ...mockTasks[id], resolved: true }

    expect(result).toStrictEqual(expected)
  })

  it('removeTask removes task from store', ({ expect }) => {
    const id = 1

    store?.removeTask(id)

    const result = store?.tasks[id].id

    expect(result).not.toBe(id)
  })
})
