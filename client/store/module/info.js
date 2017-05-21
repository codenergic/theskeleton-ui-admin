import Vue from 'vue';

const state = {
  infos: null
};

const mutations = {
  setInfos(state, infos) {
    state.infos = infos;
    return infos;
  }
};

const actions = {
  fetchInfos({commit}, hash) {
    return Vue.axios.get('/manage/info').then(response => {
      return commit('setInfos', response.data);
    });
  }
};

export default { actions, mutations, state };
