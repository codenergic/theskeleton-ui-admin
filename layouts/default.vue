<template>
  <no-ssr>
    <div id="app" class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
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
import { mapActions } from 'vuex'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    AppFooter,
    Breadcrumb
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
                q: currentRoute.query // url query
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
    }
  },
  mounted () {
    this.checkUserSession()
  }
}
</script>
