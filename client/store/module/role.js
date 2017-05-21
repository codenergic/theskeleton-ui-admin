import Vue from 'vue';

const state = {
  roles: {
  }
};

const mutations = {
  setRoles(state, roles) {
    roles.number += 1;
    return state.roles = roles;
  }
};

const actions = {
  fetchRoles({commit}, params = { page: 1, size: 20}) {
    params.page -= 1;
    return Vue.axios.get('/api/roles', { params }).then(response => {
      return commit('setRoles', response.data);
    });
  }
};

export default { actions, mutations, state };
