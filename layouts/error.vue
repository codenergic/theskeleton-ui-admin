<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="clearfix">
            <h1 class="text-center display-3">{{ error.statusCode }}</h1>
            <h4 v-for="statusCode in statusCodes.filter(s => s.statusCode === error.statusCode)" :key="statusCode.code" class="text-center">{{ statusCode.message }}</h4>
            <p v-if="error.statusCode === 401" class="text-center text-muted">
              <nuxt-link class="btn btn-info" :to="'/app-login?state=' + currentRouteState">Login</nuxt-link>
            </p>
            <p v-else class="text-center text-muted">
              <nuxt-link class="btn btn-info" to="/">Back to home</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  head () {
    return {
      title: this.message,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }
      ]
    }
  },
  data () {
    return {
      statusCodes: [
        {
          code: 401,
          message: 'Unauthorized'
        },
        {
          code: 403,
          message: 'Access Denied'
        },
        {
          code: 500,
          message: 'Server Error'
        }
      ]
    }
  },
  computed: {
    message () {
      return this.error.message || '<%= messages.client_error %>'
    },
    currentRouteState () {
      const route = this.$route
      return JSON.stringify({
        r: route.name, // route name
        q: route.query, // url query
        p: route.params // url params
      })
    }
  }
}
</script>
