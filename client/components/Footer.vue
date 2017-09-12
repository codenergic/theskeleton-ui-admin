<template>
  <b-navbar toggleable type="light" variant="light" class="fixed-bottom">
    <div class="container">
      <b-nav-toggle target="nav-collapse" position="right"></b-nav-toggle>

      <b-collapse is-nav id="nav-collapse">
        <b-nav is-nav-bar class="ml-auto" right>
          <b-nav-item>
            <i class="fa fa-globe"></i>
          </b-nav-item>
          <b-nav-item :active="lang === l.code" href="#" v-for="l in languages" :key="l" @click.prevent="$emit('change-lang', l.code)">
            {{ l.name }}
          </b-nav-item>
        </b-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {
  props: [ 'lang' ],
  data() {
    return {
      languages: [
        {
          code: 'en',
          name: 'EN'
        },
        {
          code: 'id',
          name: 'ID'
        }
      ]
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
