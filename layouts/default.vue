<template>
  <div id="app" class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
    <vue-progress-bar></vue-progress-bar>
    <app-header />
    <div v-if="$route.name === 'index'" class="app-body">
      <sidebar :nav-items="[]" />
      <main class="main">
        <breadcrumb :list="[]" />
        <div class="container-fluid">
          <nuxt />
        </div>
      </main>
    </div>
    <nuxt v-else />
    <app-footer />
  </div>
</template>

<script>
import { Header as AppHeader, Sidebar, Footer as AppFooter, Breadcrumb } from '~/components/'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Full',
  components: {
    AppHeader,
    Sidebar,
    AppFooter,
    Breadcrumb
  },
  computed: {
    ...mapState({
      isLoading: state => state.loading.loading,
      loadingProgress: state => state.loading.progress
    })
  },
  methods: {
    ...mapActions({
      checkSession: 'auth/checkAndSetLocalSession',
      doLogin: 'auth/login'
    })
  },
  watch: {
    isLoading (isLoading) {
      if (isLoading) this.$Progress.start()
      else this.$Progress.finish()
    }
  }
}
</script>
