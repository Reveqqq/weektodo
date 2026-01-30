```js
// src/store/modules/settings.js
const state = () => ({
  theme: 'light',
  language: 'en',
  notificationsEnabled: true,
})

const getters = {
  theme: (state) => state.theme,
  language: (state) => state.language,
  notificationsEnabled: (state) => state.notificationsEnabled,
}

const mutations = {
  SET_THEME(state, payload) {
    state.theme = payload
  },
  SET_LANGUAGE(state, payload) {
    state.language = payload
  },
  SET_NOTIFICATIONS(state, payload) {
    state.notificationsEnabled = payload
  },
}

const actions = {
  init({ commit }) {
    const raw = localStorage.getItem('settings')
    if (!raw) return

    try {
      const saved = JSON.parse(raw)
      if (saved.theme) commit('SET_THEME', saved.theme)
      if (saved.language) commit('SET_LANGUAGE', saved.language)
      if (typeof saved.notificationsEnabled === 'boolean')
        commit('SET_NOTIFICATIONS', saved.notificationsEnabled)
    } catch (e) {
      console.error('Failed to load settings from localStorage', e)
    }
  },

  updateTheme({ commit, state }, theme) {
    commit('SET_THEME', theme)
    localStorage.setItem(
      'settings',
      JSON.stringify({ ...state, theme })
    )
  },

  updateLanguage({ commit, state }, language) {
    commit('SET_LANGUAGE', language)
    localStorage.setItem(
      'settings',
      JSON.stringify({ ...state, language })
    )
  },

  updateNotifications({ commit, state }, enabled) {
    commit('SET_NOTIFICATIONS', enabled)
    localStorage.setItem(
      'settings',
      JSON.stringify({ ...state, notificationsEnabled: enabled })
    )
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
```