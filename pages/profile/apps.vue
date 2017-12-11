<template>
  <div>
    <b-card v-for="app in apps" :key="app.id" class="mb-2">
      <i class="fa fa-cube bg-primary p-3 font-2xl mr-3 float-left"></i>
      <b-button variant="danger" class="float-right btn-sm" @click="revokeConnectedApps(app.clientId)">
        <i class="fa fa-times"></i>
        {{ $t('common.revoke') }}
      </b-button>
      <h4 v-text="app.clientName" class="mb-1"></h4>
      <b-badge :variant="v === 'APPROVED' ? 'primary' : 'light'" v-for="(v, k) in app.scopeAndStatus" :key="k" class="mr-1 px-2 py-1">{{ k }}</b-badge>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      apps: state => state.profile.connectedApps
    })
  },
  methods: {
    ...mapActions({
      findConnectedApps: 'profile/findCurrentConnectedApps',
      revokeConnectedApps: 'profile/revokeConnectedApps'
    })
  },
  mounted () {
    this.findConnectedApps()
  }
}
</script>
