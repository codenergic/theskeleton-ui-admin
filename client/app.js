import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Index from './Index'
import BootstrapVue from 'bootstrap-vue';

import { sync } from 'vuex-router-sync'
import styles from './styles';
import router from './router'
import store from './store'

sync(store, router);

Vue.use(BootstrapVue);
Vue.use(VueAxios, Axios);

store.dispatch('getInfos');

const app = new Vue({
  router,
  store,
  ...Index
})

export { app, router, store }
