<template>
  <b-card>
    <div class="pull-right text-secondary" style="font-family: monospace">
      <h4>
        <small v-text="serverTime && serverTime.format('DD MMM YYYY')"></small>
        <span v-text="serverTime && serverTime.format('hh:mm:ss')"></span>
      </h4>
    </div>
    <h1 class="display-1 mb-3">
      The<strong>Skeleton</strong>
    </h1>
    <div class="d-flex flex-wrap">
      <div class="p-1">
        <b-button size="lg" variant="primary" :to="{ name: 'profile' }">
          <i class="fa fa-user"></i>
          {{ $t('main.route.profile') }}
        </b-button>
      </div>
      <div class="p-1">
        <b-button size="lg" variant="primary" :to="{ name: 'admin' }">
          <i class="fa fa-laptop"></i>
          {{ $t('main.route.admin') }}
        </b-button>
      </div>
      <div class="p-1">
        <b-button size="lg" variant="primary" :to="{ name: 'about' }">
          <i class="fa fa-info"></i>
          {{ $t('main.route.about') }}
        </b-button>
      </div>
      <div class="p-1">
        <b-button size="lg" variant="primary" href="https://github.com/codenergic/theskeleton" target="_blank">
          <i class="fa fa-github"></i> GitHub
        </b-button>
      </div>
    </div>
  </b-card>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      subscription: null,
      serverTime: null
    }
  },
  mounted () {
    // reload the page to trigger login if logout flag is true
    if (this.$route.params.logout) {
      this.$router.go(0)
      return
    }

    this.$stomp().then(client => {
      this.subscription = client.subscribe('/topic/server-time', message => {
        this.serverTime = moment(message.body)
      })
    })
  },
  destroyed () {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
</script>
