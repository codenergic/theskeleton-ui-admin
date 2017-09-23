export const state = () => ({
  roles: {},
  users: {},
  user: {}
})

export const mutations = {
  setUsers (state, users) {
    users.number += 1
    state.users = { ...users }
  },
  setUser (state, user) {
    state.user = { ...user }
  },
  setUserRoles (state, { username, roles }) {
    state.roles = { ...state.roles, [username]: roles }
  }
}

export const actions = {
  assignRoleToUser (context, { username, role }) {
    return this.$axios.put(`/users/${username}/roles`, { role }).then(response => {
      return response.data
    })
  },
  deleteUser ({ commit, dispatch, state }, code) {
    return this.$axios.delete(`/users/${code}`).then(response => {
      return response.data
    })
  },
  findUsers ({ commit, dispatch }, params = { q: '', page: 1, size: 20 }) {
    params.page -= 1
    params.sort = 'username,asc'
    return this.$axios.get('/users', { params }).then(response => {
      commit('setUsers', response.data)
      response.data.content.forEach(user => {
        dispatch('findUserRolesByUsername', user.username)
      })
      return response.data
    })
  },
  findUserByUsername ({ commit }, username) {
    return this.$axios.get(`/users/${username}`).then(response => {
      commit('setUser', response.data)
      return response.data
    })
  },
  findUserRolesByUsername ({ commit }, username) {
    return this.$axios.get(`/users/${username}/roles`).then(response => {
      commit('setUserRoles', {username, roles: response.data})
      return response.data
    })
  },
  lockUnlockUser (context, { username, unlocked }) {
    return this.$axios.put(`/users/${username}/lock`, { unlocked }).then(response => {
      return response.data
    })
  },
  removeRoleFromUser (context, { username, role }) {
    return this.$axios.delete(`/users/${username}/roles`, { data: { role } }).then(response => {
      return response.data
    })
  },
  saveUser ({ commit }, user = {}) {
    if (user.id) {
      return this.$axios.put(`/users/${user.id}`, user).then(response => {
        commit('setUser', response.data)
        return response.data
      })
    } else {
      return this.$axios.post('/users', user).then(response => {
        commit('setUser', response.data)
        return response.data
      })
    }
  },
  updateUserPassword (context, {username, password}) {
    return this.$axios.put(`/users/${username}/password`, { password }).then(response => {
      return response.data
    })
  }
}
