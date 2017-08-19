import Vue from 'vue';

const state = {
  posts: {},
  post: {}
};

const mutations = {
  setPosts(state, posts) {
    posts.number += 1;
    state.posts = { ...posts };
  },
  setPost(state, post) {
    state.post = { ...post };
  }
};
const actions = {
  savePost({commit}, post = {}) {
    if (post.id) {
      return Vue.axios.put(`/api/post/${post.id}`, post).then(response => {
        commit('setPost', response.data);
        return response.data;
      });
    } else {
      return Vue.axios.post('/api/post', post).then(response => {
        commit('setPost', response.data);
        return response.post;
      });
    }
  },
  findPost({commit}, params = { title: '', page: 1, size: 20}) {
    params.page -= 1;
    params.sort = 'title,asc';
    return Vue.axios.get('/api/post', { params }).then(response => {
      commit('setPosts', response.data);
      return response.data;
    });
  }
};

export default { actions, mutations, state };
