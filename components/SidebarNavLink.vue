<template>
  <router-link :to="to" class="nav-link" active-class="active">
    <i :class="icon"></i> {{ name }}
    <b-badge :variant="badge.variant">{{ badge.text }}</b-badge>
  </router-link>
</template>

<script>
export default {
  name: 'SidebarNavLink',
  props: {
    name: {
      type: String,
      default: ''
    },
    to: {
      type: Object,
      default: () => ({ name: 'index' })
    },
    icon: {
      type: String,
      default: ''
    },
    badge: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
