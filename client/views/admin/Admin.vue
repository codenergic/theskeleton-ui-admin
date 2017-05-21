<template>
  <div>
    <nav-tab :tabs="tabs" @link-click="tabClicked"></nav-tab>
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
          to: { name: 'role-list' }
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
