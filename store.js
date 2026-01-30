Вот обновленный код файла `store.js`:

```javascript
export default {
  state: {
    hoveredTaskId: null,
    hoverCardPosition: { top: 0, left: 0 },
    hoverCardVisible: false,
    hoverCardTimeout: null
  },
  mutations: {
    setHoveredTask(state, taskId) {
      state.hoveredTaskId = taskId
    },
    setHoverCardPosition(state, position) {
      state.hoverCardPosition = position
    },
    setHoverCardVisible(state, isVisible) {
      state.hoverCardVisible = isVisible
    },
    setHoverCardTimeout(state, timeout) {
      if (state.hoverCardTimeout) {
        clearTimeout(state.hoverCardTimeout)
      }
      state.hoverCardTimeout = timeout
    }
  },
  actions: {
    showHoverCard({ commit }, { taskId, position }) {
      commit('setHoveredTask', taskId)
      commit('setHoverCardPosition', position)
      commit('setHoverCardVisible', true)
    },
    hideHoverCard({ commit, state }) {
      const timeout = setTimeout(() => {
        if (!document.querySelector('.hover-card:hover')) {
          commit('setHoverCardVisible', false)
          commit('setHoveredTask', null)
        }
      }, 100)
      commit('setHoverCardTimeout', timeout)
    },
    updateHoverCardPosition({ commit }, position) {
      commit('setHoverCardPosition', position)
    }
  },
  getters: {
    isTaskHovered: state => taskId => {
      return state.hoveredTaskId === taskId
    }
  }
}
```