<template>
  <div>
    <nav-tab :tabs="tabs" @link-click="tabClicked"></nav-tab>
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
          to: { name: 'user-list' }
        },
        {
          title: 'Roles',
          icon: 'fa fa-users',
          to: { name: 'role' }
        }
      ]
    };
  },
  methods: {
    tabClicked(tab, index) {
    }
  }
}
</script>
