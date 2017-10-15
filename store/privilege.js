export const state = () => ({
  privileges: {},
  privilege: {}
})

export const mutations = {
  setPrivileges (state, privileges) {
    privileges.number += 1
    state.privileges = { ...privileges }
  },
  setPrivilege (state, privilege) {
    state.privilege = { ...privilege }
  }
}

export const actions = {
  findPrivileges ({ commit, dispatch }, params = { q: '', page: 1, size: 20 }) {
    params.page -= 1
    params.sort = 'name,asc'
    return this.$axios.get('/privileges', { params }).then(response => {
      commit('setPrivileges', response.data)
      response.data.content.forEach(privilege => {
        dispatch('findPrivilegeByName', privilege.name)
      })
      return response.data
    })
  },
  findPrivilegeByName ({ commit }, name) {
    return this.$axios.get(`/privileges/${name}`).then(response => {
      commit('setPrivilege', response.data)
      return response.data
    })
  }
}
