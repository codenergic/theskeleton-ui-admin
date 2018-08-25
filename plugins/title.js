import Vue from 'vue'

Vue.mixin({
  head () {
    if (!this.$route) return ''
    return {
      title: this.$t(`main.route.${this.$route.name}`)
    }
  }
})
