<template>
  <div>
    Redirecting...
  </div>
</template>

<script>
import queryString from 'query-string'
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
      const router = this.$router
      if (route.hash && route.hash.startsWith('#access_token')) {
        this.doLogin(route.hash).then(() => {
          // redirect
          if (this.beforeLoginState) {
            const beforeLoginState = JSON.parse(this.beforeLoginState)
            router.push({ name: beforeLoginState.r, query: beforeLoginState.q })
          } else {
            router.push({ name: 'index' })
          }
        })
      } else {
        const clientId = '0000015bb4a150850007bf0700000000'
        const origin = window.location.origin
        const redirectUri = origin + '/app-login'
        const responseType = 'token'
        const scope = 'read write'
        const state = route.query.state
        const queryParam = '?' + queryString.stringify({
          'client_id': clientId,
          'redirect_uri': redirectUri,
          'response_type': responseType,
          scope,
          state
        })
        window.location.href = origin + '/oauth/authorize' + queryParam
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
