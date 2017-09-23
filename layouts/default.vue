<template>
  <no-ssr>
    <div class="app">
      <AppHeader />
      <div class="app-body">
        <Sidebar :navItems="nav"/>
        <main class="main">
          <breadcrumb :list="list" />
          <div class="container-fluid">
            <nuxt />
          </div>
        </main>
        <!-- <AppAside/> -->
      </div>
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
  data () {
    return {
      nav: [
        {
          name: 'User',
          to: { name: 'admin-users' },
          icon: 'fa fa-user'
        },
        {
          name: 'Role',
          to: { name: 'role' },
          icon: 'fa fa-users'
        }
      ]
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
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
