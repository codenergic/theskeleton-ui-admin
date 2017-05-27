import Vue from 'vue';

const state = {
  loggedInUser: {}
};

const mutations = {
  setLoggedInUser(state, user) {
    state.loggedInUser = { ...user };
  }
};

const actions = {
};

export default { actions, mutations, state };
