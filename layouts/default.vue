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
  }
}
</script>
