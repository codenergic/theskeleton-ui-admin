<template>
  <div class="app-body">
    <Sidebar :navItems="nav"/>
    <main class="main">
      <breadcrumb />
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
          name: this.$t('profile.basic.title'),
          to: { name: 'profile-basic' },
          icon: 'fa fa-user'
        },
        {
          name: this.$t('profile.password.title'),
          to: { name: 'profile-password' },
          icon: 'fa fa-key'
        },
        {
          name: this.$t('profile.picture.title'),
          to: { name: 'profile-picture' },
          icon: 'fa fa-camera'
        }
      ]
    }
  }
}
</script>
