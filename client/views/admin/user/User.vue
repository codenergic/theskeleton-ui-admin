<template>
  <router-view></router-view>
</template>

<script>
export default {
  mounted() {
    this.redirectToDefaultRoute();
  },
  methods: {
    redirectToDefaultRoute() {
      if (this.$route.name === 'user') {
        this.$router.push({ name: 'user-list' });
      }
    }
  },
  watch: {
    ['$store.state.route.name']() {
      this.redirectToDefaultRoute();
    }
  }
}
</script>
