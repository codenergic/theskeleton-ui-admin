export const state = () => ({
  privileges: {},
  roles: {},
  role: {}
})

export const mutations = {
  setRoles (state, roles) {
    roles.number += 1
    state.roles = { ...roles }
  },
  setRole (state, role) {
    state.role = { ...role }
  },
  setRolePrivileges (state, { code, privileges }) {
    state.privileges = { ...state.privileges, [code]: privileges }
  }
}

export const actions = {
  assignPrivilegeToRole (context, { code, privilege }) {
    return this.$axios.put(`/roles/${code}/privileges`, { privilege }).then(response => {
      return response.data
    })
  },
  deleteRole ({ commit, dispatch, state }, code) {
    return this.$axios.delete(`/roles/${code}`).then(response => {
      return response.data
    })
  },
  findRoles ({ commit, dispatch }, params = { q: '', page: 1, size: 20 }) {
    params.page -= 1
    params.sort = 'code,asc'
    return this.$axios.get('/roles', { params }).then(response => {
      commit('setRoles', response.data)
      return response.data
    })
  },
  findRoleByCode ({ commit }, code) {
    return this.$axios.get(`/roles/${code}`).then(response => {
      commit('setRole', response.data)
      return response.data
    })
  },
  findRolePrivilegesByCode ({ commit }, code) {
    return this.$axios.get(`/roles/${code}/privileges`).then(response => {
      commit('setRolePrivileges', { code, privileges: response.data })
      return response.data
    })
  },
  removePrivilegeFromRole (context, { code, privilege }) {
    return this.$axios.delete(`/roles/${code}/privileges`, { data: { privilege } }).then(response => {
      return response.data
    })
  },
  saveRole ({ commit }, role = {}) {
    if (role.id) {
      return this.$axios.put(`/roles/${role.id}`, role).then(response => {
        commit('setRole', response.data)
        return response.data
      })
    } else {
      return this.$axios.post('/roles', role).then(response => {
        commit('setRole', response.data)
        return response.data
      })
    }
  }
}

export default { actions, mutations, state }
