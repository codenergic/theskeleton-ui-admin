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
          title: this.$t('admin.user.title'),
          icon: 'fa fa-user',
          active: true,
          to: { name: 'user' }
        },
        {
          title: this.$t('admin.role.title'),
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
