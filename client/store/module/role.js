import Vue from 'vue';

const state = {
  privileges: {},
  roles: {},
  role: {}
};

const mutations = {
  setRoles(state, roles) {
    roles.number += 1;
    state.roles = { ...roles };
  },
  setRole(state, role) {
    state.role = { ...role };
  },
  setRolePrivileges(state, {code, privileges}) {
    state.privileges = { ...state.privileges, [code]: privileges };
  }
};

const actions = {
  assignPrivilegeToRole(context, {code, privilege}) {
    return Vue.axios.put(`/api/roles/${code}/privileges`, {privilege}).then(response => {
      return response.data;
    });
  },
  deleteRole({commit, dispatch, state}, code) {
    return Vue.axios.delete(`/api/roles/${code}`).then(response => {
      return response.data;
    });
  },
  findRoles({commit, dispatch}, params = { q: '', page: 1, size: 20}) {
    params.page -= 1;
    params.sort = 'code,asc';
    return Vue.axios.get('/api/roles', { params }).then(response => {
      commit('setRoles', response.data);
      response.data.content.forEach(role => {
        dispatch('findRolePrivilegesByCode', role.code);
      });
      return response.data;
    });
  },
  findRoleByCode({commit}, code) {
    return Vue.axios.get(`/api/roles/${code}`).then(response => {
      commit('setRole', response.data);
      return response.data;
    });
  },
  findRolePrivilegesByCode({commit}, code) {
    return Vue.axios.get(`/api/roles/${code}/privileges`).then(response => {
      commit('setRolePrivileges', {code, privileges: response.data});
      return response.data;
    });
  },
  removePrivilegeFromRole(context, {code, privilege}) {
    return Vue.axios.delete(`/api/roles/${code}/privileges`, { data: { privilege } }).then(response => {
      return response.data;
    });
  },
  saveRole({commit}, role = {}) {
    if (role.id) {
      return Vue.axios.put(`/api/roles/${role.id}`, role).then(response => {
        commit('setRole', response.data);
        return response.data;
      });
    } else {
      return Vue.axios.post('/api/roles', role).then(response => {
        commit('setRole', response.data);
        return response.data;
      });
    }
  }
};

export default { actions, mutations, state };
