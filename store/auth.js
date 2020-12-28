import cookie from 'js-cookie'

export const state = () => ({
  session: null,
  loggedInUser: {},
  responseHttpStatus: null,
  lastState: null
})

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
  async getAuthorizationHeader ({ dispatch }) {
    const session = await dispatch('checkAndSetLocalSession')
    return 'Bearer ' + session.accessToken
  },
  async checkAndSetLocalSession ({ commit, dispatch, state }) {
    // check access token from state
    if (state.session) {
      return state.session
    }

    // get session from cookie if no session in state
    const session = await dispatch('getSessionFromCookie')
    commit('setSession', session)

    await dispatch('findCurrentUser')

    return state.session
  },
  findCurrentUser ({ commit }) {
    return this.$axios.get('/users/me').then(response => {
      commit('setLoggedInUser', response.data)
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  async logout () {
    cookie.remove('session')
    return {}
  },
  async getSessionFromCookie () {
    if (cookie.get('session')) {
      return JSON.parse(atob(cookie.get('session')))
    }

    return ''
  }
}
