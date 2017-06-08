<template>
  <div id="app">
    <navbar></navbar>
    <vue-progress-bar></vue-progress-bar>
    <div class="container">
      <notification :variant="$store.state.notif.variant" :text="$store.state.notif.text" :countdown="$store.state.notif.countdown" @countdownChanged="countdownChanged"></notification>
    </div>
    <router-view class="container"></router-view>
  </div>
</template>

<script>
import Navbar from 'components/Navbar';
import Notification from 'components/Notification';

export default {
  components: {
    Navbar,
    Notification
  },
  methods: {
    countdownChanged(dismissCountdown) {
      this.$store.commit('countdownNotif', dismissCountdown);
    }
  }
}
</script>

<style>
/* Show it is fixed to the top */
body {
  padding-top: 4.5rem;
}
</style>
