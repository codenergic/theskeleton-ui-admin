<template>
  <div>
    <b-card>
      <template slot="header">
        <b-button variant="primary" class="my-0" :to="{ name: 'profile-oauth-apps' }">
          <i class="fa fa-list"></i>
          {{ $t('common.view', [$t('profile.oauthApps.label')]) }}
        </b-button>
      </template>
      <form method="post" @submit.prevent="save">
        <div class="row">
          <div class="col-md-5">
            <div class="form-group">
              <label for="id" v-text="$t('profile.oauthApps.labelAppId')"></label>
              <b-form-input id="id" v-model="app.id" name="id" readonly></b-form-input>
            </div>
          </div>
          <div class="col-md-7">
            <div class="form-group">
              <label for="secret" v-text="$t('profile.oauthApps.labelAppSecret')"></label>
              <b-input-group>
                <b-form-input id="secret" v-model="app.clientSecret" name="secret" readonly></b-form-input>
                <b-button v-if="app.id" @click="generateSecret">
                  <i class="fa fa-refresh"></i>
                </b-button>
              </b-input-group>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-5">
            <div class="form-group">
              <label for="name" v-text="$t('profile.oauthApps.labelAppName')"></label>
              <b-form-input id="name" v-model="app.name" name="name"></b-form-input>
            </div>
          </div>
          <div class="col-md-7">
            <div class="form-group">
              <label for="description" v-text="$t('profile.oauthApps.labelAppDescription')"></label>
              <b-form-input id="description" v-model="app.description" name="description"></b-form-input>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label v-text="$t('profile.oauthApps.labelAuthorizedGrantTypes')"></label>
          <div v-for="(value, index) in grantTypes" :key="index">
            <b-form-checkbox v-model="app.authorizedGrantTypes[index]" :value="value" unchecked-value="">
              {{ value }}
            </b-form-checkbox>
          </div>
        </div>
        <div class="form-group">
          <label for="redirectUri0" v-text="$t('profile.oauthApps.labelRedirectUris')"></label>
          <div v-for="(redirectUri, index) in app.registeredRedirectUris" :key="index" class="mb-1">
            <b-input-group>
              <b-button v-if="app.registeredRedirectUris.length > 1 && index < (app.registeredRedirectUris.length - 1)" variant="danger" @click="app.registeredRedirectUris.splice(index, 1)">
                <i class="fa fa-times"></i>
              </b-button>
              <b-form-input :id="'redirectUri' + index" v-model="app.registeredRedirectUris[index]" :name="'redirectUri' + index"></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="form-group">
          <b-button variant="primary" type="submit">
            <i class="fa fa-floppy-o"></i> {{ app.id ? $t('common.update', []) : $t('common.save') }}
          </b-button>
        </div>
      </form>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      app: {
        id: null,
        name: null,
        description: null,
        clientSecret: null,
        registeredRedirectUris: [ '' ],
        authorizedGrantTypes: [ '', '', '' ]
      },
      grantTypes: [
        'AUTHORIZATION_CODE', 'IMPLICIT', 'PASSWORD'
      ]
    }
  },
  computed: {
    ...mapState({
      immutableApp: state => state.client.app
    })
  },
  methods: {
    generateSecret () {
      this.generateAppSecret(this.app.id).then(() => this.setCurrentApp())
    },
    save () {
      this.saveApp(this.app).then(() => {
        this.setCurrentApp()
        this.$router.replace({ name: this.$route.name, params: { id: this.app.id } })
      })
    },
    setCurrentApp () {
      this.app = { ...this.immutableApp }
      this.app.registeredRedirectUris = [ ...this.immutableApp.registeredRedirectUris ]
      this.app.authorizedGrantTypes = this.grantTypes.map(grant => this.immutableApp.authorizedGrantTypes.indexOf(grant) >= 0 ? grant : '')
      return this.app
    },
    ...mapActions({
      findAppById: 'client/findAppById',
      generateAppSecret: 'client/generateAppSecret',
      saveApp: 'client/saveApp'
    }),
    ...mapMutations({
      setApp: 'client/setApp'
    })
  },
  watch: {
    'app.registeredRedirectUris' () {
      const redirectUris = this.app.registeredRedirectUris
      if (redirectUris[redirectUris.length - 1] !== '') {
        redirectUris.push('')
      }
    }
  },
  mounted () {
    const id = this.$route.params.id
    if (id === '+') {
      this.setApp(null)
    } else {
      this.findAppById(id).then(() => this.setCurrentApp())
    }
    this.setCurrentApp()
  }
}
</script>
