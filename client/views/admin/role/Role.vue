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
      if (this.$route.name === 'role') {
        this.$router.push({ name: 'role-list' });
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
