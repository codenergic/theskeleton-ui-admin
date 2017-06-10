<template>
  <b-navbar toggleable type="inverse" variant="inverse" class="fixed-top">
    <div class="container">
      <b-nav-toggle target="nav-collapse" position="right"></b-nav-toggle>

      <b-link class="navbar-brand" :to="{ name: 'home' }">
        <span>The<strong>Skeleton</strong></span>
      </b-link>

      <b-collapse is-nav id="nav-collapse">
        <b-nav is-nav-bar>
          <b-nav-item :to="{ name: 'admin' }">
            Admin
          </b-nav-item>
          <b-nav-item :to="{ name: 'about' }">
            About
          </b-nav-item>
        </b-nav>
        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="text">
              <i class="fa fa-user"></i>
              {{ $store.getters.loggedInUser.username }}
            </template>
            <b-dropdown-item :to="{ name: 'profile' }">
              <i class="fa fa-user"></i> Profile
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: 'about' }">
              <i class="fa fa-sign-out"></i> Sign out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<style>
@media (max-width: 767px) {
  .navbar-toggleable-sm > .container {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
