import Vue from 'vue'

Vue.mixin({
  head () {
    return {
      title: this.$t(`main.route.${this.$route.name}`)
    }
  }
})
