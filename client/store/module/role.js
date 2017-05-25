import Vue from 'vue';

const state = {
  roles: {},
  role: {}
};

const mutations = {
  setRoles(state, roles) {
    roles.number += 1;
    return state.roles = { ...roles };
  },
  setRole(state, role) {
    return state.role = { ...role };
  }
};

const actions = {
  deleteRole({commit, dispatch, state}, code) {
    return Vue.axios.delete(`/api/roles/${code}`).then(response => {
      return response.data;
    });
  },
  findRoles({commit, rootState}, params = { q: '', page: 1, size: 20}) {
    params.page -= 1;
    params.sort = 'code,asc';
    return Vue.axios.get('/api/roles', { params }).then(response => {
      return commit('setRoles', response.data);
    });
  },
  findRoleByCode({commit}, code) {
    return Vue.axios.get(`/api/roles/${code}`).then(response => {
      return commit('setRole', response.data);
    });
  },
  saveRole({commit}, role = {}) {
    if (role.id) {
      return Vue.axios.put(`/api/roles/${role.id}`, role).then(response => {
        return commit('setRole', response.data);
      });
    } else {
      return Vue.axios.post('/api/roles', role).then(response => {
        return commit('setRole', response.data);
      });
    }
  }
};

export default { actions, mutations, state };
