```js
import tasks from '@/store/modules/tasks'

describe('store/modules/tasks', () => {
  let state

  beforeEach(() => {
    state = {
      list: [],
      nextId: 1
    }
  })

  describe('mutations', () => {
    it('ADD_TASK adds a new task with an incremental id', () => {
      const payload = { title: 'Test task', completed: false }
      tasks.mutations.ADD_TASK(state, payload)

      expect(state.list).toHaveLength(1)
      expect(state.list[0]).toEqual({
        id: 1,
        title: 'Test task',
        completed: false
      })
      expect(state.nextId).toBe(2)
    })

    it('REMOVE_TASK removes the task with the given id', () => {
      state.list = [
        { id: 1, title: 'First', completed: false },
        { id: 2, title: 'Second', completed: false }
      ]
      tasks.mutations.REMOVE_TASK(state, 1)

      expect(state.list).toHaveLength(1)
      expect(state.list[0].id).toBe(2)
    })

    it('TOGGLE_TASK toggles the completed flag of the task', () => {
      state.list = [{ id: 1, title: 'Toggle me', completed: false }]
      tasks.mutations.TOGGLE_TASK(state, 1)

      expect(state.list[0].completed).toBe(true)

      tasks.mutations.TOGGLE_TASK(state, 1)
      expect(state.list[0].completed).toBe(false)
    })
  })

  describe('actions', () => {
    it('addTask commits ADD_TASK mutation', async () => {
      const commit = jest.fn()
      const payload = { title: 'Async task', completed: false }

      await tasks.actions.addTask({ commit }, payload)

      expect(commit).toHaveBeenCalledWith('ADD_TASK', payload)
    })

    it('removeTask commits REMOVE_TASK mutation', async () => {
      const commit = jest.fn()
      const id = 3

      await tasks.actions.removeTask({ commit }, id)

      expect(commit).toHaveBeenCalledWith('REMOVE_TASK', id)
    })

    it('toggleTask commits TOGGLE_TASK mutation', async () => {
      const commit = jest.fn()
      const id = 5

      await tasks.actions.toggleTask({ commit }, id)

      expect(commit).toHaveBeenCalledWith('TOGGLE_TASK', id)
    })
  })

  describe('getters', () => {
    it('allTasks returns the full list', () => {
      state.list = [
        { id: 1, title: 'A', completed: false },
        { id: 2, title: 'B', completed: true }
      ]

      const result = tasks.getters.allTasks(state)

      expect(result).toBe(state.list)
    })

    it('completedTasks returns only completed items', () => {
      state.list = [
        { id: 1, title: 'A', completed: false },
        { id: 2, title: 'B', completed: true }
      ]

      const result = tasks.getters.completedTasks(state)

      expect(result).toEqual([{ id: 2, title: 'B', completed: true }])
    })

    it('pendingTasks returns only pending items', () => {
      state.list = [
        { id: 1, title: 'A', completed: false },
        { id: 2, title: 'B', completed: true }
      ]

      const result = tasks.getters.pendingTasks(state)

      expect(result).toEqual([{ id: 1, title: 'A', completed: false }])
    })
  })
})
```