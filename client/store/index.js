import Vue from 'vue';
import Vuex from 'vuex';

import modules from './module';

Vue.use(Vuex);

// global state
const state = {
}

// global mutations
const mutations = {
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
