<template>
  <div>
    <confirm-dialog id="confirm-delete" :title="$t('common.deleteConfirm')" @dialog-confirm="remove(appToBeDeleted.id)">
      <i18n path="common.deleteConfirmation" tag="span">
        <strong v-text="appToBeDeleted.name"></strong>
      </i18n>
    </confirm-dialog>
    <div class="row">
      <div class="col-12">
        <b-button variant="primary" size="lg" :to="{ name: 'profile-oauth-apps-id', params: { id: '+' } }">
          <i class="fa fa-plus"></i> {{ $t('profile.oauthApps.labelCreateNewApp') }}
        </b-button>
      </div>
    </div>
    <br />
    <b-card v-for="app in apps.content" :key="app.id" class="mb-2">
      <b-button variant="danger" class="float-right btn-sm" v-b-modal.confirm-delete @click="appToBeDeleted=app">
        <i class="fa fa-times"></i>
        {{ $t('common.delete', []) }}
      </b-button>
      <b-link :to="{ name: $route.name + '-id', params: { id: app.id } }">
        <i class="fa fa-cube bg-primary p-3 font-2xl mr-3 float-left"></i>
      </b-link>
      <b-link :to="{ name: $route.name + '-id', params: { id: app.id } }">
        <h4 v-text="app.name" class="mb-1"></h4>
      </b-link>
      <h5 v-text="app.id" class="text-muted"></h5>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import ConfirmDialog from '~/components/ConfirmDialog'

export default {
  components: {
    ConfirmDialog
  },
  data () {
    return {
      appToBeDeleted: {

      }
    }
  },
  computed: {
    ...mapState({
      apps: state => state.client.userApps
    })
  },
  methods: {
    remove (appId) {
      this.removeApp(appId).then(() => {
        this.appToBeDeleted = {}
        this.findApps()
      })
    },
    ...mapActions({
      findApps: 'client/findCurrentUserApps',
      removeApp: 'client/removeApp'
    }),
    ...mapMutations({
      setApp: 'client/setApp'
    })
  },
  mounted () {
    this.setApp(null)
    this.findApps()
  }
}
</script>
