import Vue from 'vue';
import Axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import VueAxios from 'vue-axios';
import queryString from 'query-string';
import { sync } from 'vuex-router-sync'

import Index from './Index';
import router from './router'
import store from './store'
import styles from './styles';

sync(store, router);

Vue.use(BootstrapVue);
Vue.use(VueAxios, Axios);

const app = new Vue({
  router,
  store,
  ...Index,
  mounted() {
    const store = this.$store;
    const state = store.state;

    Axios.interceptors.request.use(config => {
      config.headers.Authorization = store.getters.getAuthorizationHeader;
      return config;
    });

    if (state.route.hash && state.route.hash.startsWith('#access_token')) {
      store.dispatch('login', state.route.hash).then(() => {
        window.location.href = window.location.origin;
      });
    } else {
      store.dispatch('checkSession').then(result => {
        if (result) return;
        const client_id = '0000015bb4a150850007bf0700000000';
        const redirect_uri = window.location.origin + '/';
        const response_type = 'token';
        const scope = 'read write';
        const queryParam = '?' + queryString.stringify({ client_id, redirect_uri, response_type, scope });
        window.location.href = redirect_uri + 'oauth/authorize' + queryParam;
      });
    }
  }
});

export { app, router, store }
