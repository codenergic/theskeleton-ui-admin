import Vue from 'vue';

const state = {
  loggedInUser: {}
};

const mutations = {
  setLoggedInUser(state, user) {
    state.loggedInUser = { ...user };
  }
};

const getters = {
  loggedInUser(state) {
    return state.loggedInUser;
  }
};

const actions = {
  findCurrentUser({commit}) {
    return Vue.axios.get('/api/users/me').then(response => {
      commit('setLoggedInUser', response.data);
      return response.data;
    });
  },
  updateCurrentUser({commit}, user) {
    return Vue.axios.put('/api/users/me', user).then(response => {
      commit('setLoggedInUser', response.data);
      return response.data;
    });
  }
};

export default { actions, getters, mutations, state };