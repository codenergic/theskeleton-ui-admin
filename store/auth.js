import queryString from 'query-string'

export const state = () => ({
  session: null,
  loggedInUser: {},
  responseHttpStatus: null,
  lastState: null
})

export const getters = {
  isSessionValid (state, getters) {
    if (state.session) {
      if (new Date().getTime() >= state.session.expires_at) {
        return false
      }
      return true
    }
    return false
  },
  getAuthorizationHeader (state) {
    if (state.session) {
      return 'Bearer ' + state.session.access_token
    }
    return null
  }
}

export const mutations = {
  setLastState (state, lastState) {
    state.lastState = lastState
  },
  setLoggedInUser (state, user) {
    state.loggedInUser = { ...user }
  },
  setResponseHttpStatus (state, httpStatus) {
    state.responseHttpStatus = httpStatus
  },
  setSession (state, session) {
    state.session = session
  }
}

export const actions = {
  checkSession ({ commit, dispatch, getters, state }) {
    const session = window.localStorage.getItem('session')
    if (!session) {
      return dispatch('deleteSession').then(() => false)
    } else {
      if (getters.isSessionValid && state.loggedInUser.username) {
        return true
      } else {
        return dispatch('saveSession', JSON.parse(session)).then(() => {
          return true
        })
      }
    }
  },
  deleteSession ({ commit }) {
    window.localStorage.removeItem('session')
    commit('setSession', null)
  },
  findCurrentUser ({ commit, dispatch }) {
    return this.$axios.get('/profile').then(response => {
      commit('setLoggedInUser', response.data)
      return response.data
    }).catch(error => {
      if (error.response.status === 401) {
        dispatch('deleteSession')
      }
      return error.response.data
    })
  },
  login ({ commit, dispatch, state }, hash) {
    const session = queryString.parse(hash)
    const expiresTime = new Date(new Date().getTime() + (session.expires_in * 1000))
    session.expires_at = expiresTime.getTime()
    return dispatch('saveSession', session)
  },
  logout () {
    return this.$axios.get('/../auth/logout')
  },
  saveSession ({ commit, dispatch, getters }, session) {
    window.localStorage.setItem('session', JSON.stringify(session))
    commit('setSession', session)
    this.$axios.interceptors.request.use(config => {
      config.headers.Authorization = getters.getAuthorizationHeader
      return config
    })
    dispatch('findCurrentUser')
  },
  updateCurrentUser ({ commit }, user) {
    return this.$axios.put('/api/profile', user).then(response => {
      commit('setLoggedInUser', response.data)
      return response.data
    })
  },
  updateCurrentUserPassword ({ commit }, password) {
    return this.$axios
      .put('/api/profile/password', { password: password.newPassword })
      .then(response => response.data)
  }
}
