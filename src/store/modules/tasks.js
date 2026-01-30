```js
import api from '@/services/api'

const state = () => ({
  list: [],
  loading: false,
  error: null
})

const getters = {
  allTasks: state => state.list,
  isLoading: state => state.loading,
  getTaskById: state => id => state.list.find(t => t.id === id)
}

const mutations = {
  SET_LOADING(state, value) {
    state.loading = value
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_TASKS(state, tasks) {
    state.list = tasks
  },
  ADD_TASK(state, task) {
    state.list.push(task)
  },
  UPDATE_TASK(state, updated) {
    const idx = state.list.findIndex(t => t.id === updated.id)
    if (idx !== -1) {
      state.list.splice(idx, 1, updated)
    }
  },
  DELETE_TASK(state, id) {
    state.list = state.list.filter(t => t.id !== id)
  }
}

const actions = {
  async fetchTasks({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const { data } = await api.get('/tasks')
      commit('SET_TASKS', data)
    } catch (e) {
      commit('SET_ERROR', e)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createTask({ commit }, payload) {
    try {
      const { data } = await api.post('/tasks', payload)
      commit('ADD_TASK', data)
      return data
    } catch (e) {
      commit('SET_ERROR', e)
      throw e
    }
  },

  async updateTask({ commit }, payload) {
    try {
      const { data } = await api.put(`/tasks/${payload.id}`, payload)
      commit('UPDATE_TASK', data)
      return data
    } catch (e) {
      commit('SET_ERROR', e)
      throw e
    }
  },

  async deleteTask({ commit }, id) {
    try {
      await api.delete(`/tasks/${id}`)
      commit('DELETE_TASK', id)
    } catch (e) {
      commit('SET_ERROR', e)
      throw e
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
```