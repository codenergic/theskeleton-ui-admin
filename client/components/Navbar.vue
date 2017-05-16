<template>
  <b-navbar toggleable type="inverse" variant="inverse" class="fixed-top">
    <div class="container">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-link class="navbar-brand" :to="{ name: 'home' }">
        <span>The<strong>Skeleton</strong></span>
      </b-link>

      <b-collapse is-nav id="a">
        <b-nav is-nav-bar>
          <b-nav-item :to="{ name: 'admin' }">
            Admin
          </b-nav-item>
          <b-nav-item :to="{ name: 'about' }">
            About
          </b-nav-item>
        </b-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>
