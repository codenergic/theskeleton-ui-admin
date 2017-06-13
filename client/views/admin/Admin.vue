<template>
  <div>
    <nav-tab :tabs="tabs"></nav-tab>
    <br />
    <router-view></router-view>
  </div>
</template>

<script>
import NavTab from 'components/NavTab';

export default {
  components: {
    NavTab
  },
  data() {
    return {
      tabs: [
        {
          title: 'Users',
          icon: 'fa fa-user',
          active: true,
          to: { name: 'user' }
        },
        {
          title: 'Roles',
          icon: 'fa fa-users',
          to: { name: 'role' }
        }
      ]
    };
  },
  mounted() {
    this.redirectToDefaultRoute();
  },
  methods: {
    redirectToDefaultRoute() {
      if (this.$route.name === 'admin') {
        this.$router.push({ name: 'user' });
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
