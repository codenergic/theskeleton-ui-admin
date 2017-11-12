<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <b-link class="navbar-brand" :to="{ name: 'index' }"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarMinimize">&#9776;</button>
    <b-nav is-nav-bar class="d-md-down-none">
      <b-nav-item class="px-3" :to="{ name: 'admin' }">Admin</b-nav-item>
    </b-nav>
    <b-nav is-nav-bar class="ml-auto">
      <b-nav-item-dropdown right>
        <template slot="text">
          <span class="d-md-down-none"></span>
          <i class="fa fa-user"></i>
        </template>
        <b-dropdown-header tag="div" class="text-center">
          <strong>Account</strong>
        </b-dropdown-header>
        <b-dropdown-item :to="{ name: 'profile' }">
          <i class="fa fa-user"></i>
          Profile
        </b-dropdown-item>
        <b-dropdown-item :to="{ name: 'about' }">
          <i class="fa fa-info"></i>
          About
        </b-dropdown-item>
        <b-dropdown-item>
          <i class="fa fa-lock"></i>
          Logout
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
    &nbsp;&nbsp;&nbsp;
    <!-- <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">&#9776;</button> -->
  </header>
</template>
<script>
export default {
  name: 'header',
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.getElementById('app').classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.getElementById('app').classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.getElementById('app').classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.getElementById('app').classList.toggle('aside-menu-hidden')
    }
  }
}
</script>
