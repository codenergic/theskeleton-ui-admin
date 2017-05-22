<template>
  <router-view></router-view>
</template>

<script>
export default {
  mounted() {
    this.$router.push({ name: 'role-list' });
  },
  watch: {
    ['$store.state.route.name'](route) {
      if (route === 'role') {
        this.$router.push({ name: 'role-list' });
      }
    }
  }
}
</script>
