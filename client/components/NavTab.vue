<template>
  <b-nav tabs>
    <!-- <b-nav-item v-for="(tab, index) in tabs" :key="tab.title" inactive @click="linkClick(tab, index)">
      <i :class="tab.icon"></i>
      {{ tab.title }}
    </b-nav-item> -->
    <li class="nav-item" v-for="(tab, index) in tabs" :key="tab.title">
      <a :class="'nav-link' + (tab.active ? ' active' : '')" @click="linkClick(tab, index)" :to="tab.to">
        <i :class="tab.icon"></i>
        {{ tab.title }}
      </a>
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
    }
  }
}
</script>
