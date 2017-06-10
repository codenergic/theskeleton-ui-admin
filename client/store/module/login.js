import Vue from 'vue';
import queryString from 'query-string';

const state = {
  session: null
};

const getters = {
  isSessionValid(state, getters) {
    if (state.session) {
      if (new Date().getTime() >= state.session.expires_at) {
        return false;
      }
      return true;
    }
    return false;
  },
  getAuthorizationHeader(state) {
    if (state.session) {
      return 'Bearer ' + state.session.access_token;
    }
    return null;
  }
}

const mutations = {
  setSession(state, session) {
    state.session = session;
  },
  deleteSession(state) {
    state.session = null;
  }
};

const actions = {
  login({commit, dispatch, state}, hash) {
    const session = queryString.parse(hash);
    const expiresTime = new Date(new Date().getTime() + (session.expires_in * 1000));
    session.expires_at = expiresTime.getTime();
    return dispatch('saveSession', session);
  },
  checkSession({commit, dispatch, getters}) {
    const session = window.localStorage.getItem('session');
    if (!session) {
      return dispatch('deleteSession').then(() => false);
    } else {
      return dispatch('saveSession', JSON.parse(session)).then(() => {
        if (getters.isSessionValid) {
          return true;
        }
        return false;
      });
    }
  },
  deleteSession({commit}) {
    window.localStorage.removeItem('session');
    commit('deleteSession');
    window.location.reload();
  },
  saveSession({commit, dispatch, getters}, session) {
    window.localStorage.setItem('session', JSON.stringify(session));
    commit('setSession', session);
    Vue.axios.interceptors.request.use(config => {
      config.headers.Authorization = getters.getAuthorizationHeader;
      return config;
    });
    dispatch('findCurrentUser');
  }
};

export default { actions, getters, mutations, state };
