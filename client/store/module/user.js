import Vue from 'vue';

const state = {
  roles: {},
  users: {},
  user: {}
};

const mutations = {
  setUsers(state, users) {
    users.number += 1;
    state.users = { ...users };
  },
  setUser(state, user) {
    state.user = { ...user };
  },
  setRoles(state, {username, roles}) {
    state.roles = { ...state.roles, [username]: roles };
  }
};

const actions = {
  deleteUser({commit, dispatch, state}, code) {
    return Vue.axios.delete(`/api/users/${code}`).then(response => {
      return response.data;
    });
  },
  findUsers({commit, dispatch, rootState}, params = { q: '', page: 1, size: 20}) {
    params.page -= 1;
    params.sort = 'username,asc';
    return Vue.axios.get('/api/users', { params }).then(response => {
      commit('setUsers', response.data);
      response.data.content.forEach(user => {
        dispatch('findUserRolesByUsername', user.username);
      });
      return response.data;
    });
  },
  findUserByUsername({commit}, username) {
    return Vue.axios.get(`/api/users/${username}`).then(response => {
      commit('setUser', response.data);
      return response.data;
    });
  },
  findUserRolesByUsername({commit}, username) {
    return Vue.axios.get(`/api/users/${username}/roles`).then(response => {
      commit('setRoles', {username, roles: response.data});
      return response.data;
    });
  },
  saveUser({commit}, user = {}) {
    if (user.id) {
      return Vue.axios.put(`/api/users/${user.id}`, user).then(response => {
        commit('setUser', response.data);
        return response.data;
      });
    } else {
      return Vue.axios.post('/api/users', user).then(response => {
        commit('setUser', response.data);
        return response.data;
      });
    }
  }
};

export default { actions, mutations, state };
