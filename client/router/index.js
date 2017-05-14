import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home'
import About from '../views/About'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'about',
      path: '/about',
      component: About
    }
  ]
});
