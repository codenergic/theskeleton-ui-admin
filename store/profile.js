export const state = () => ({
  connectedApps: [],
  loggedInUser: {}
})

export const mutations = {
  setConnectedApps (state, apps) {
    state.connectedApps = apps
  },
  setLoggedInUser (state, user) {
    state.loggedInUser = { ...user }
  }
}

export const actions = {
  findCurrentConnectedApps ({ commit }) {
    return this.$axios.get('/profile/connected-apps').then(response => {
      commit('setConnectedApps', response.data)
      return response.data
    })
  },
  findCurrentUser ({ commit, dispatch }) {
    return this.$axios.get('/profile').then(response => {
      commit('setLoggedInUser', response.data)
      return response.data
    }).catch(error => {
      if (error.response.status === 401) {
        dispatch('auth/deleteSession')
      }
      return error.response.data
    })
  },
  revokeConnectedApps ({ commit, dispatch }, id) {
    return this.$axios.delete('/profile/connected-apps', { data: id })
      .then(() => dispatch('findCurrentConnectedApps'))
  },
  updateCurrentUser ({ commit }, user) {
    return this.$axios.put('/profile', user).then(response => {
      commit('setLoggedInUser', response.data)
      return response.data
    })
  },
  updateCurrentUserPassword ({ commit }, password) {
    return this.$axios.put('/profile/password', { password: password.newPassword }).then(response => {
      return response.data
    })
  }
}
