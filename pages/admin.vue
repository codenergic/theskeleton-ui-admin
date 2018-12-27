<template>
  <div class="app-body">
    <sidebar :nav-items="nav" />
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
  computed: {
    list () {
      return this.$route.matched
    },
    name () {
      return this.$route.name
    },
    nav () {
      return [
        {
          name: this.$t('main.route.admin-users'),
          to: { name: 'admin-users' },
          icon: 'fa fa-user'
        },
        {
          name: this.$t('main.route.admin-roles'),
          to: { name: 'admin-roles' },
          icon: 'fa fa-users'
        }
      ]
    }
  }
}
</script>
