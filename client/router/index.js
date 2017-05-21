import Vue from 'vue';
import Router from 'vue-router';

import Admin from '../views/admin/Admin';
import AdminRoleList from '../views/admin/role/RoleList';

import About from '../views/About';
import Home from '../views/Home';
import Login from '../components/Login';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'login',
      path: '/app-login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'about',
      path: '/about',
      component: About
    },
    {
      name: 'admin',
      path: '/admin',
      component: Admin,
      children: [
        {
          name: 'user-list',
          path: 'users',
          component: AdminRoleList
        },
        {
          name: 'role-list',
          path: 'roles',
          component: AdminRoleList
        }
      ]
    }
  ]
});
