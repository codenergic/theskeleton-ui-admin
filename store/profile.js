export const state = () => ({
  connectedApps: [],
  loggedInUser: {},
  sessions: [],
  socials: {
    facebook: {},
    google: {}
  }
})

export const mutations = {
  setConnectedApps (state, apps) {
    state.connectedApps = apps
  },
  setLoggedInUser (state, user) {
    state.loggedInUser = { ...user }
  },
  setSessions (state, sessions) {
    state.sessions = sessions
  },
  setSocials (state, socials) {
    state.socials.facebook = socials.facebook || {}
    state.socials.google = socials.google || {}
  }
}

export const actions = {
  disconnectCurrentConnectedSocial (ctx, provider) {
    return this.$axios.delete('/users/me/socials', { data: provider })
  },
  findCurrentConnectedApps ({ commit }) {
    return this.$axios.get('/users/me/connected-apps').then(response => {
      commit('setConnectedApps', response.data)
      return response.data
    })
  },
  findCurrentConnectedSocials ({ commit }) {
    return this.$axios.get('/users/me/socials').then(response => {
      commit('setSocials', response.data)
      return response.data
    })
  },
  findCurrentUser ({ commit, dispatch }) {
    return this.$axios.get('/users/me').then(response => {
      commit('setLoggedInUser', response.data)
      return response.data
    }).catch(error => {
      if (error.response.status === 401) {
        dispatch('auth/deleteSession')
      }
      return error.response.data
    })
  },
  findCurrentUserSessions ({ commit }) {
    return this.$axios.get('/users/me/sessions').then(response => {
      commit('setSessions', response.data)
      return response.data
    })
  },
  revokeConnectedApps ({ dispatch }, id) {
    return this.$axios.delete('/users/me/connected-apps', { data: id })
      .then(() => dispatch('findCurrentConnectedApps'))
  },
  revokeSession ({ dispatch }, id) {
    return this.$axios.delete('/users/me/sessions', { data: id })
      .then(() => dispatch('findCurrentUserSessions'))
  },
  updateCurrentUser ({ commit }, user) {
    return this.$axios.put('/users/me', user).then(response => {
      commit('setLoggedInUser', response.data)
      return response.data
    })
  },
  updateCurrentUserPassword (ctx, password) {
    return this.$axios.put('/users/me/password', { password: password.newPassword }).then(response => {
      return response.data
    })
  }
}
