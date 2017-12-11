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
  mounted () {
    this.logout().then(() => this.deleteSession())
      .then(() => {
        this.$router.push({ name: 'index' })
      })
  }
}
</script>
