export const state = () => ({
  loggedInUser: {}
})

export const mutations = {
  setLoggedInUser (state, user) {
    state.loggedInUser = { ...user }
  }
}

export const actions = {
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
