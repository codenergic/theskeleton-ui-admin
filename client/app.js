import Vue from 'vue';
import Axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import VueAxios from 'vue-axios';
import { sync } from 'vuex-router-sync'

import Index from './Main';
import router from './router'
import store from './store'
import styles from './styles';

Vue.use(BootstrapVue);
Vue.use(VueAxios, Axios);

store.dispatch('checkSession').then(result => {
  if (!result && router.currentRoute.name !== 'login') {
    router.push({ name: 'login', query: { state: store.state.route.name  } });
  }
});

sync(store, router);

const app = new Vue({
  router,
  store,
  ...Index
});

export { app, router, store }
