import Vue from 'vue';

const state = {
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
  }
};

const actions = {
  deleteUser({commit, dispatch, state}, code) {
    return Vue.axios.delete(`/api/users/${code}`).then(response => {
      return response.data;
    });
  },
  findUsers({commit, rootState}, params = { q: '', page: 1, size: 20}) {
    params.page -= 1;
    params.sort = 'username,asc';
    return Vue.axios.get('/api/users', { params }).then(response => {
      commit('setUsers', response.data);
      return response.data;
    });
  },
  findUserByCode({commit}, code) {
    return Vue.axios.get(`/api/users/${code}`).then(response => {
      commit('setUser', response.data);
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
