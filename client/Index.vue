<template>
  <div id="app">
    <navbar></navbar>
    <router-view class="container"></router-view>
  </div>
</template>

<script>
import Navbar from 'components/Navbar';

export default {
  components: {
    Navbar
  }
}
</script>

<style>
/* Show it is fixed to the top */
body {
  min-height: 75rem;
  padding-top: 4.5rem;
}
</style>
