<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="clearfix">
            <h1 class="text-center display-3">{{ $store.responseHttpStatus }}</h1>
            <h4 class="text-center pt-3" v-if="$store.responseHttpStatus === 401">Unauthorized</h4>
            <h4 class="text-center pt-3" v-if="$store.responseHttpStatus === 403">Access Denied</h4>
            <p class="text-center text-muted" v-if="$store.responseHttpStatus === 401"><nuxt-link class="btn btn-info" :to="'/app-login?state=' + $store.lastState">Login</nuxt-link></p>
            <p class="text-center text-muted" v-else-if="$store.responseHttpStatus === 403"><nuxt-link class="btn btn-info" to="/">Go Home</nuxt-link></p>
            <p class="text-center text-muted" v-else><nuxt-link class="btn btn-info" to="/">Back to home</nuxt-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
