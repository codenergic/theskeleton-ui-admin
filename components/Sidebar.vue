<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <div slot="header"></div>
      <ul class="nav">
        <li v-for="item in navItems" :key="item.name" class="nav-item">
          <template v-if="item.title">
            <sidebar-nav-title :name="item.name" :classes="item.class" :wrapper="item.wrapper" />
          </template>
          <template v-else-if="item.divider">
            <li class="divider"></li>
          </template>
          <template v-else>
            <template v-if="item.children">
              <sidebar-nav-dropdown :name="item.name" :to="item.to" :icon="item.icon">
                <template v-for="child in item.children">
                  <template v-if="child.children">
                    <sidebar-nav-dropdown :key="child.name" :name="child.name" :to="child.to" :icon="child.icon">
                      <li v-for="ch in item.children" :key="ch.name" class="nav-item">
                        <sidebar-nav-link :name="ch.name" :to="ch.to" :icon="ch.icon" :badge="ch.badge" />
                      </li>
                    </sidebar-nav-dropdown>
                  </template>
                  <template v-else>
                    <li :key="child.name" class="nav-item">
                      <sidebar-nav-link :name="child.name" :to="child.to" :icon="child.icon" :badge="child.badge" />
                    </li>
                  </template>
                </template>
              </sidebar-nav-dropdown>
            </template>
            <template v-else>
              <sidebar-nav-link :name="item.name" :to="item.to" :icon="item.icon" :badge="item.badge" />
            </template>
          </template>
        </li>
      </ul>
      <slot></slot>
      <div slot="footer"></div>
    </nav>
  </div>
</template>
<script>
import SidebarNavDropdown from './SidebarNavDropdown'
import SidebarNavLink from './SidebarNavLink'
import SidebarNavTitle from './SidebarNavTitle'
export default {
  name: 'Sidebar',
  props: {
    navItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    SidebarNavDropdown,
    SidebarNavLink,
    SidebarNavTitle
  },
  methods: {
    handleClick (e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  }
}
</script>

<style lang="css">
  .nav-link {
    cursor:pointer;
  }
</style>
