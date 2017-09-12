<template>
  <b-navbar toggleable type="dark" variant="dark" class="fixed-top">
    <div class="container">
      <b-nav-toggle target="nav-collapse" position="right"></b-nav-toggle>

      <b-link class="navbar-brand" :to="{ name: 'home' }">
        <span v-html="brand"></span>
      </b-link>

      <b-collapse is-nav id="nav-collapse">
        <b-nav is-nav-bar>
          <b-nav-item :to="{ name: 'admin' }">
            <i class="fa fa-bolt"></i>
            Admin
          </b-nav-item>
          <b-nav-item :to="{ name: 'write' }">
            <i class="fa fa-pencil"></i>
            Write a Story
          </b-nav-item>
          <b-nav-item :to="{ name: 'read' }">
            <i class="fa fa-book"></i>
            Read Stories
          </b-nav-item>
        </b-nav>
        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="text">
              <i class="fa fa-user"></i>
            </template>
            <b-dropdown-item :to="{ name: 'profile' }">
              <i class="fa fa-user"></i> Profile
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: 'about' }">
              <i class="fa fa-info-circle"></i> About
            </b-dropdown-item>
            <div class="dropdown-divider"></div>
            <b-dropdown-item>
              <a href="" @click="signOut()">
                <i class="fa fa-sign-out"></i> Sign out
              </a>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {
  props: [ 'brand' ],
  methods: {
    signOut() {
      this.$store.dispatch('deleteSession').then(() => {
        window.location.href = `${window.location.origin}/auth/logout`;
      });
    }
  }
}
</script>

<style>
@media (max-width: 767px) {
  .navbar-toggleable-sm > .container {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
