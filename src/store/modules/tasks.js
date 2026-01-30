```js
// src/store/modules/tasks.js
import api from '@/api'

export default {
  namespaced: true,

  state: {
    tasks: [],
    loading: false,
    error: null,
    hoveredTaskId: null,
    hoverTimeoutId: null,
  },

  getters: {
    all: (state) => state.tasks,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    hoveredTaskId: (state) => state.hoveredTaskId,
  },

  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks
    },
    ADD_TASK(state, task) {
      state.tasks.push(task)
    },
    UPDATE_TASK(state, updated) {
      const index = state.tasks.findIndex((t) => t.id === updated.id)
      if (index !== -1) state.tasks.splice(index, 1, updated)
    },
    REMOVE_TASK(state, id) {
      state.tasks = state.tasks.filter((t) => t.id !== id)
    },
    SET_LOADING(state, flag) {
      state.loading = flag
    },
    SET_ERROR(state, err) {
      state.error = err
    },

    // hover handling
    SET_HOVERED_TASK(state, taskId) {
      state.hoveredTaskId = taskId
    },
    CLEAR_HOVERED_TASK(state) {
      state.hoveredTaskId = null
    },
    SET_HOVER_TIMEOUT(state, timeoutId) {
      state.hoverTimeoutId = timeoutId
    },
    CLEAR_HOVER_TIMEOUT(state) {
      if (state.hoverTimeoutId) {
        clearTimeout(state.hoverTimeoutId)
        state.hoverTimeoutId = null
      }
    },
  },

  actions: {
    async fetchTasks({ commit }) {
      commit('SET_LOADING', true)
      try {
        const tasks = await api.getTasks()
        commit('SET_TASKS', tasks)
      } catch (e) {
        commit('SET_ERROR', e)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createTask({ commit }, payload) {
      const task = await api.createTask(payload)
      commit('ADD_TASK', task)
    },

    async updateTask({ commit }, payload) {
      const updated = await api.updateTask(payload)
      commit('UPDATE_TASK', updated)
    },

    async deleteTask({ commit }, id) {
      await api.deleteTask(id)
      commit('REMOVE_TASK', id)
    },

    // hover actions
    hoverTask({ commit, state }, taskId) {
      commit('CLEAR_HOVER_TIMEOUT')
      commit('SET_HOVERED_TASK', taskId)
    },

    unhoverTask({ commit, state }, delay = 150) {
      commit('CLEAR_HOVER_TIMEOUT')
      const timeoutId = setTimeout(() => {
        commit('CLEAR_HOVERED_TASK')
        commit('CLEAR_HOVER_TIMEOUT')
      }, delay)
      commit('SET_HOVER_TIMEOUT', timeoutId)
    },

    cancelHover({ commit }) {
      commit('CLEAR_HOVER_TIMEOUT')
      commit('CLEAR_HOVERED_TASK')
    },
  },
}
```