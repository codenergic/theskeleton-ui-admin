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
      deleteSession: 'auth/deleteSession'
    })
  },
  mounted () {
    this.deleteSession().then(() => {
      window.location.href = process.env.serverUrl + '/auth/logout'
    })
  }
}
</script>
