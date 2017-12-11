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
  computed: {
    nav () {
      return [
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
        },
        {
          name: this.$t('profile.apps.title'),
          to: { name: 'profile-apps' },
          icon: 'fa fa-cubes'
        },
        {
          name: this.$t('profile.session.title'),
          to: { name: 'profile-sessions' },
          icon: 'fa fa-lock'
        }
      ]
    }
  }
}
</script>
