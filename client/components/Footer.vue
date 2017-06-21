<template>
  <b-navbar toggleable type="light" variant="faded" class="fixed-bottom">
    <div class="container">
      <b-nav-toggle target="nav-collapse" position="right"></b-nav-toggle>

      <b-collapse is-nav id="nav-collapse">
        <b-nav is-nav-bar class="ml-auto" right>
          <b-nav-item-dropdown dropup>
            <template slot="text">
              <i class="fa fa-globe"></i>
            </template>
            <a :class="['dropdown-item', lang === l.code ? 'active' : '']" href="#" v-for="l in languages" :key="l" @click.prevent="$emit('change-lang', l.code)" v-text="l.name"></a>
          </b-nav-item-dropdown>
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
          name: 'English'
        },
        {
          code: 'id',
          name: 'Bahasa Indonesia'
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
