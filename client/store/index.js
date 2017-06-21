import Vue from 'vue';
import Vuex from 'vuex';

import modules from './module';
import i18n from '../i18n/i18n';

Vue.use(Vuex);

// global state
const state = {
  paginationLimit: 20,
  language: window.localStorage.getItem('lang') || 'en'
}

// global mutations
const mutations = {
  setPaginationLimit(state, limit) {
    state.paginationLimit = Number(limit);
  },
  setLang(state, code) {
    state.language = code;
  }
}

// global actions
const actions = {
  setLang({commit}, code) {
    commit('setLang', code);
    window.localStorage.setItem('lang', code);
    i18n.locale = code;
  }
}

const store = new Vuex.Store({
  actions,
  mutations,
  state,
  modules
})

export default store
