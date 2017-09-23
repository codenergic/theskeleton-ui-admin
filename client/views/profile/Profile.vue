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
          title: this.$t('profile.basic.title'),
          icon: 'fa fa-user',
          to: { name: 'profile-basic' }
        },
        {
          title: this.$t('profile.password.title'),
          icon: 'fa fa-key',
          to: { name: 'profile-password' }
        },
        {
          title: this.$t('profile.picture.title'),
          icon: 'fa fa-camera',
          to: { name: 'profile-picture' }
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
