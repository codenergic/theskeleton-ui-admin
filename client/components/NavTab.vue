<template>
  <b-nav tabs>
    <li class="nav-item" v-for="(tab, index) in tabs" :key="tab.title">
      <router-link :class="'nav-link' + (linkMatch(tab) ? ' active' : '')" @click="linkClick(tab, index)" :to="tab.to">
        <i :class="tab.icon"></i>
        {{ tab.title }}
      </router-link>
    </li>
  </b-nav>
</template>

<script>
export default {
  props: [ 'tabs' ],
  methods: {
    linkClick(tab, index) {
      this.tabs.forEach((t, i) => { t.active = index === i });
      this.$emit('link-click', tab, index);
    },
    linkMatch(tab) {
      const matched = this.$route.matched;
      for (let m in matched) {
        m = matched[m];
        if (tab.to.name === m.name) {
          return true;
        }
      }
      return false;
    }
  }
}
</script>
