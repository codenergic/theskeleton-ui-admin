import Vue from 'vue';

const state = {
  privileges: {},
  privilege: {}
};

const mutations = {
  setPrivileges(state, privileges) {
    privileges.number += 1;
    state.privileges = { ...privileges };
  },
  setPrivilege(state, privilege) {
    state.privilege = { ...privilege };
  }
};

const actions = {
  findPrivileges({commit, dispatch}, params = { q: '', page: 1, size: 20}) {
    params.page -= 1;
    params.sort = 'name,asc';
    return Vue.axios.get('/api/privileges', { params }).then(response => {
      commit('setPrivileges', response.data);
      response.data.content.forEach(privilege => {
        dispatch('findPrivilegeByName', privilege.name);
      });
      return response.data;
    });
  },
  findPrivilegeByName({commit}, name) {
    return Vue.axios.get(`/api/privileges/${name}`).then(response => {
      commit('setPrivilege', response.data);
      return response.data;
    });
  }
};

export default { actions, mutations, state };
