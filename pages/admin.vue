<template>
  <div class="app-body">
    <Sidebar :navItems="nav"/>
    <main class="main">
      <breadcrumb :list="list" />
      <div class="container-fluid">
        <nuxt />
      </div>
    </main>
  </div>
</template>

<script>
import { Sidebar, Breadcrumb } from '~/components/'

export default {
  components: {
    Breadcrumb,
    Sidebar
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
          to: { name: 'admin' },
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
