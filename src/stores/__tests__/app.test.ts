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
    expect(store?.getTaskById(0, CURRENT_USER)).toStrictEqual(mockTasks[0])
  })

  it('getTaskById returns undefined for unknown user', ({ expect }) => {
    expect(store?.getTaskById(0, UNKNOWN_USER)).toBeUndefined()
  })

  it('getTasksByAuthorId returns tasks where author is current user', ({ expect }) => {
    expect(store?.getTasksByAuthorId(CURRENT_USER)).toStrictEqual(
      mockTasks.filter(({ authorId }) => authorId === CURRENT_USER)
    )
  })

  it('getTasksByAuthorId returns empty array for unknown user', ({ expect }) => {
    expect(store?.getTasksByAuthorId(UNKNOWN_USER)).toStrictEqual([])
  })

  it('getTasksByAssigneeId returns tasks where assignee is current user', ({ expect }) => {
    expect(store?.getTasksByAssigneeId(CURRENT_USER)).toStrictEqual(
      mockTasks.filter(({ assigneeId }) => assigneeId === CURRENT_USER)
    )
  })

  it('getTasksByAssigneeId returns empty array for unknown user', ({ expect }) => {
    expect(store?.getTasksByAssigneeId(UNKNOWN_USER)).toStrictEqual([])
  })

  it('getTasksByUserId returns tasks where assignee or author is current user', ({ expect }) => {
    expect(store?.getTasksByUserId(CURRENT_USER)).toStrictEqual(
      mockTasks.filter(({ authorId, assigneeId }) =>
        [authorId, assigneeId].some((x) => x === CURRENT_USER)
      )
    )
  })

  it('getTasksByUserId returns empty array for unknown user', ({ expect }) => {
    expect(store?.getTasksByUserId(UNKNOWN_USER)).toStrictEqual([])
  })

  it('getUserById returns user by id', ({ expect }) => {
    expect(store?.getUserById(CURRENT_USER)).toStrictEqual(mockUsers[CURRENT_USER])
  })

  it('getUserById returns undefined for unknown user', ({ expect }) => {
    expect(store?.getUserById(UNKNOWN_USER)).toBeUndefined()
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

    expect(store?.tasks.at(-1)).toStrictEqual({ id: newId, ...temp })
  })

  it('updateTask updates data in task', ({ expect }) => {
    const temp: Partial<Task> = {
      title: 'Test'
    }

    store?.updateTask(0, temp)

    expect(store?.tasks[0]).toStrictEqual({ ...mockTasks[0], ...temp })
  })

  it('resolveTask change task status', ({ expect }) => {
    store?.resolveTask(1)

    expect(store?.tasks[1]).toStrictEqual({ ...mockTasks[1], resolved: true })
  })

  it('removeTask removes task from store', ({ expect }) => {
    store?.removeTask(1)

    expect(store?.tasks[1].id).not.toBe(1)
  })
})
