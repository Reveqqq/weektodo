```js
// src/store/modules/tasks.js

import api from '@/api'

const state = {
  tasks: [],
  hoveredTaskId: null,
  // …другие свойства состояния
}

const getters = {
  tasks: state => state.tasks,
  hoveredTaskId: state => state.hoveredTaskId,
  // …другие геттеры
}

const actions = {
  async fetchTasks({ commit }) {
    const response = await api.getTasks()
    commit('SET_TASKS', response.data)
  },

  setHoveredTask({ commit }, taskId) {
    commit('SET_HOVERED_TASK_ID', taskId)
  },

  clearHoveredTask({ commit }) {
    commit('SET_HOVERED_TASK_ID', null)
  },

  // …другие действия
}

const mutations = {
  SET_TASKS(state, tasks) {
    state.tasks = tasks
  },

  SET_HOVERED_TASK_ID(state, taskId) {
    state.hoveredTaskId = taskId
  },

  // …другие мутации
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
```