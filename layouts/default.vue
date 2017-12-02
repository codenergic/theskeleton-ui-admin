<template>
  <no-ssr>
    <div id="app" class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
      <vue-progress-bar></vue-progress-bar>
      <AppHeader />
      <div class="app-body" v-if="$route.name === 'index'">
        <Sidebar :navItems="[]"/>
        <main class="main">
          <breadcrumb :list="[]" />
          <div class="container-fluid">
            <nuxt />
          </div>
        </main>
      </div>
      <nuxt v-else />
      <AppFooter/>
    </div>
  </no-ssr>
</template>

<script>
import { Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter, Breadcrumb } from '~/components/'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppAside,
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
    checkUserSession () {
      const currentRoute = this.$route
      this.checkSession().then(isLoggedIn => {
        // if not logged in yet, redirect to login page
        if (!isLoggedIn && currentRoute.name !== 'app-login') {
          this.$router.push({
            name: 'app-login',
            query: {
              state: JSON.stringify({
                r: currentRoute.name, // route name
                q: currentRoute.query, // url query
                p: currentRoute.params // url params
              })
            }
          })
        }
      })
    },
    ...mapActions({
      checkSession: 'auth/checkSession'
    })
  },
  watch: {
    $route () {
      this.checkUserSession()
    },
    isLoading (isLoading) {
      if (isLoading) this.$Progress.start()
      else this.$Progress.finish()
    }
  },
  mounted () {
    this.checkUserSession()
  }
}
</script>
