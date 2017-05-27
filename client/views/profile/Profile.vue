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
          title: 'Basic',
          icon: 'fa fa-user',
          to: { name: 'profile-basic' }
        },
        {
          title: 'Password',
          icon: 'fa fa-key',
          to: { name: 'profile-password' }
        }
      ]
    };
  },
  mounted() {
    this.redirectToDefaultRoute();
  },
  methods: {
    redirectToDefaultRoute() {
      if (this.$route.name === 'profile') {
        this.$router.push({ name: 'profile-basic' });
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
