<template>
  <div class="app-body">
    <main class="main">
      <div class="container-fluid">
        <info :infos="$store.state.info.infos"></info>
      </div>
    </main>
  </div>
</template>

<script>
import Info from '~/components/Info'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Info
  },
  computed: {
    ...mapState({
      infos: state => state.info.infos
    })
  },
  methods: {
    ...mapActions({
      fetchInfos: 'info/fetchInfos'
    })
  },
  mounted () {
    this.fetchInfos()
  }
}
</script>
