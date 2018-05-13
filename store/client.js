const initialAppState = () => ({
  id: null,
  name: null,
  description: null,
  clientSecret: '',
  registeredRedirectUris: [ '' ],
  authorizedGrantTypes: [ 'AUTHORIZATION_CODE', 'IMPLICIT', 'PASSWORD' ]
})

export const state = () => ({
  app: initialAppState(),
  userApps: {}
})

export const mutations = {
  setApp (state, app) {
    if (app) {
      state.app = { ...app }
    } else {
      state.app = initialAppState()
    }
  },
  setUserApps (state, apps) {
    state.userApps = apps
  }
}

export const actions = {
  findAppById ({ commit }, id) {
    return this.$axios.get(`/clients/${id}`).then(response => {
      commit('setApp', response.data)
      return response.data
    })
  },
  findCurrentUserApps ({ commit }, params = { q: '', page: 1, size: 20 }) {
    params.page -= 1
    return this.$axios.get('/users/me/clients', { params }).then(response => {
      commit('setUserApps', response.data)
      return response.data
    })
  },
  generateAppSecret ({ commit }, appId) {
    return this.$axios.put(`/clients/${appId}/generate-secret`).then(response => {
      commit('setApp', response.data)
      return response.data
    })
  },
  removeApp (context, appId) {
    return this.$axios.delete(`/clients/${appId}`).then(response => {
      return response.data
    })
  },
  saveApp ({ commit }, app) {
    app.registeredRedirectUris = app.registeredRedirectUris.filter(uri => uri.trim() !== '')
    app.authorizedGrantTypes = app.authorizedGrantTypes.filter(uri => uri.trim() !== '')
    const action = app.id ? this.$axios.put(`/clients/${app.id}`, app) : this.$axios.post('/clients', app)
    return action.then(response => {
      commit('setApp', response.data)
      return response.data
    })
  }
}
