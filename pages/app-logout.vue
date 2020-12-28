<template>
  <div>
    Redirecting...
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      deleteSession: 'auth/deleteSession',
      logout: 'auth/logout'
    })
  },
  async mounted () {
    const logoutWindow = window.open(`${process.env.serverUrl}/auth/logout`, '_blank')

    await new Promise(resolve => {
      window.setTimeout(resolve, 2000)
    })
    logoutWindow.close()
    await this.logout()
    await this.$router.push({ name: 'index', params: { logout: true } })
  }
}
</script>
