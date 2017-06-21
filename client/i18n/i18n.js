import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './i18n-en';
import id from './i18n-id';
import store from '../store';

Vue.use(VueI18n);

export default new VueI18n({
  locale: store.state.language,
  messages: {
    en,
    id
  }
});
