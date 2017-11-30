<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <b-link class="navbar-brand" :to="{ name: 'index' }"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarMinimize">&#9776;</button>
    <b-navbar-nav class="d-md-down-none">
      <b-nav-item class="px-3" :to="{ name: 'admin' }">Admin</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right>
        <template slot="text">
          <span class="d-md-down-none"></span>
          <i class="fa fa-language"></i>
        </template>
        <b-dropdown-item v-for="l in langs" :key="l" :active="l === lang" @click="changeLang(l)">{{ l.toUpperCase() }}</b-dropdown-item>
      </b-nav-item-dropdown>
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
    </b-navbar-nav>
  </header>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'header',
  computed: {
    ...mapState({
      lang: state => state.i18n.lang,
      langs: state => state.i18n.langs
    })
  },
  methods: {
    asideToggle (e) {
      e.preventDefault()
      document.getElementById('app').classList.toggle('aside-menu-hidden')
    },
    changeLang (lang) {
      this.setLang(lang)
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.getElementById('app').classList.toggle('sidebar-mobile-show')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.getElementById('app').classList.toggle('sidebar-minimized')
    },
    sidebarToggle (e) {
      e.preventDefault()
      document.getElementById('app').classList.toggle('sidebar-hidden')
    },
    ...mapActions({
      getLang: 'i18n/getLang',
      setLang: 'i18n/setLang'
    })
  },
  mounted () {
    this.getLang().then(this.setLang)
  }
}
</script>
