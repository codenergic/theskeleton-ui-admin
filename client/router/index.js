import Vue from 'vue';
import Router from 'vue-router';

import Admin from '../views/admin/Admin';

import AdminRole from '../views/admin/role/Role';
import AdminRoleForm from '../views/admin/role/RoleForm';
import AdminRoleList from '../views/admin/role/RoleList';
import AdminRolePrivilegeForm from '../views/admin/role/RolePrivilegeForm';

import AdminUser from '../views/admin/user/User';
import AdminUserForm from '../views/admin/user/UserForm';
import AdminUserList from '../views/admin/user/UserList';
import AdminUserRoleForm from '../views/admin/user/UserRoleForm';

import Profile from '../views/profile/Profile';
import ProfileBasic from '../views/profile/ProfileBasic';
import ProfilePassword from '../views/profile/ProfilePassword';

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
          name: 'user',
          path: 'users',
          component: AdminUser,
          children: [
            {
              name: 'user-form',
              path: ':id',
              component: AdminUserForm
            },
            {
              name: 'user-role-form',
              path: ':id/roles',
              component: AdminUserRoleForm
            },
            {
              name: 'user-list',
              path: '',
              component: AdminUserList
            }
          ]
        },
        {
          name: 'role',
          path: 'roles',
          component: AdminRole,
          children: [
            {
              name: 'role-form',
              path: ':id',
              component: AdminRoleForm
            },
            {
              name: 'role-privilege-form',
              path: ':id/privileges',
              component: AdminRolePrivilegeForm
            },
            {
              name: 'role-list',
              path: '',
              component: AdminRoleList
            }
          ]
        }
      ]
    },
    {
      name: 'profile',
      path: '/profile',
      component: Profile,
      children: [
        {
          name: 'profile-basic',
          path: 'basic',
          component: ProfileBasic
        },
        {
          name: 'profile-password',
          path: 'password',
          component: ProfilePassword
        }
      ]
    }
  ]
});
