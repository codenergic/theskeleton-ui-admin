import Vue from 'vue';
import Vuex from 'vuex';

import modules from './module';

Vue.use(Vuex);

// global state
const state = {
  paginationLimit: 20
}

// global mutations
const mutations = {
  setPaginationLimit(state, limit) {
    state.paginationLimit = Number(limit);
  }
}

// global actions
const actions = {
}

const store = new Vuex.Store({
  actions,
  mutations,
  state,
  modules
})

export default store
