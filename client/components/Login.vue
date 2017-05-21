<template>
</template>

<script>
import queryString from 'query-string';

export default {
  mounted() {
    const store = this.$store;
    const state = store.state;
    const router = this.$router;

    store.dispatch('checkSession').then(result => {
      if (result) {
        redirect();
      } else {
        login();
      }
    });

    function login() {
      if (state.route.hash && state.route.hash.startsWith('#access_token')) {
        store.dispatch('login', state.route.hash).then(() => {
          redirect();
        });
      } else {
        const client_id = '0000015bb4a150850007bf0700000000';
        const origin = window.location.origin;
        const redirect_uri = origin + '/app-login';
        const response_type = 'token';
        const scope = 'read write';
        const state = store.state.route.query.state;
        const queryParam = '?' + queryString.stringify({ client_id, redirect_uri, response_type, scope, state });
        window.location.href = origin + '/oauth/authorize' + queryParam;
      }
    }

    function redirect() {
      if(state.login.session.state) {
        router.push({ name: state.login.session.state });
      } else {
        router.push({ name: home });
      }
    }
  }
}
</script>
