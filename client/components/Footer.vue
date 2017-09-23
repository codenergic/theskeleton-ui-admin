<template>
  <b-navbar type="light" variant="light" class="fixed-bottom">
    <div class="container">
      <b-nav class="ml-auto" right>
        <b-nav-item>
          <i class="fa fa-globe"></i>
        </b-nav-item>
        <b-nav-item :active="lang === l.code" href="#" v-for="l in languages" :key="l" @click.prevent="$emit('change-lang', l.code)">
          {{ l.name }}
        </b-nav-item>
      </b-nav>
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
</style>
