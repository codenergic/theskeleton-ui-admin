<template>
  <div>
    Redirecting...
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      beforeLoginState: state => state.auth.session.state
    })
  },
  methods: {
    login () {
      const route = this.$route
      if (route.hash && route.hash.startsWith('#access_token')) {
        // send token to backend
        window.location.replace(`/app-login?${route.hash.substring(1)}`)
      }
    },
    ...mapActions({
      doLogin: 'auth/login'
    })
  },
  mounted () {
    this.login()
  }
}
</script>
