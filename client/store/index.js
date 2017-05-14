import Vue from 'vue';
import Vuex from 'vuex';

import modules from './module';

Vue.use(Vuex)

const state = {
  count: 0,
  infos: {}
}

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  },
  SET_INFOS (state, response) {
    state.infos = response.data;
  }
}

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  },
  getInfos({ commit }) {
    Vue.axios.get('/manage/info').then(response => {
      commit('SET_INFOS', response);
    });
  }
}

const store = new Vuex.Store({
  actions,
  mutations,
  state,
  modules
})

export default store
