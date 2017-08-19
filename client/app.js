import Vue from 'vue';
import Axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import VueAxios from 'vue-axios';
import VueProgressBar from 'vue-progressbar'
import VueQuillEditor from 'vue-quill-editor'

import { sync } from 'vuex-router-sync'

import Index from './Main';
import i18n from './i18n/i18n';
import router from './router'
import store from './store'
import styles from './styles';

Vue.use(BootstrapVue);
Vue.use(VueAxios, Axios);
Vue.use(VueProgressBar);
Vue.use(VueQuillEditor)

store.dispatch('checkSession').then(result => {
  if (!result && router.currentRoute.name !== 'login') {
    router.push({ name: 'login', query: { state: store.state.route.name  } });
  }
});

sync(store, router);

const app = new Vue({
  i18n,
  router,
  store,
  ...Index,
  mounted() {
    document.title = this.$t('main.title');
  }
});

Vue.axios.interceptors.request.use(config => {
  app.$Progress.start();
  config.onUploadProgress = (progressEvent) => {
    // do nothing
  }
  config.onDownloadProgress = (progressEvent) => {
    if (progressEvent.total === 0 || progressEvent.total === progressEvent.loaded) {
      app.$Progress.finish();
      return;
    }
    var percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
    app.$Progress.set(percentComplete);
  }
  return config;
});

export { app, router, store }
