<template>
  <div>
    <b-card no-body>
      <template slot="header">
        <b-button variant="primary" class="my-0" :to="{ name: 'admin-users' }">
          <i class="fa fa-list"></i>
          {{ $t('common.view', [$t('admin.user.label')]) }}
        </b-button>
      </template>
      <b-tabs>
        <b-tab :title="$t('profile.basic.title')">
          <form method="post" @submit.prevent @submit="save(user)">
            <div class="form-group">
              <label for="code" v-text="$t('admin.user.labelUsername')"></label>
              <b-form-input id="username" v-model="user.username" name="username"></b-form-input>
            </div>
            <div class="form-group">
              <label for="description" v-text="$t('admin.user.labelEmail')"></label>
              <b-form-input id="email" v-model="user.email" name="email" email></b-form-input>
            </div>
            <div>
              <b-button variant="primary" type="submit">
                <i class="fa fa-floppy-o"></i> {{ user.id ? $t('common.update', []) : $t('common.save') }}
              </b-button>
            </div>
          </form>
        </b-tab>
        <b-tab v-if="user.id" :title="$t('profile.password.title')">
          <form @submit.prevent="updatePassword(user.username, password.confirmPassword)">
            <div class="form-group">
              <label for="new-password" v-text="$t('profile.password.labelPasswordNew')"></label>
              <b-form-input id="new-password" v-model="password.newPassword" name="new-password" type="password"></b-form-input>
            </div>
            <div class="form-group">
              <label for="confirm-new-password" v-text="$t('profile.password.labelPasswordConfirm')"></label>
              <b-form-input id="confirm-new-password" v-model="password.confirmPassword" name="confirm-new-password" type="password"></b-form-input>
            </div>
            <div>
              <b-button variant="primary" :disabled="!passwordMatch" type="submit">
                <i class="fa fa-floppy-o"></i> {{ $t('common.update', []) }}
              </b-button>
            </div>
          </form>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      originalUsername: null,
      password: {
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    addOrModifyLabel () {
      const userLabel = this.$t('admin.user.label')
      return this.user.id ? this.$t('common.modify', [userLabel, this.originalUsername]) : this.$t('common.addNew', [userLabel])
    },
    passwordMatch () {
      if (this.password.newPassword === undefined || this.password.newPassword === '') {
        return false
      }
      return this.password.newPassword === this.password.confirmPassword
    },
    ...mapState({
      user: state => Object.assign({}, state.user.user)
    })
  },
  methods: {
    save (user) {
      user.id = this.originalUsername
      this.saveUser(user).then(() => {
        this.findUsers({ q: user.username }).then(() => {
          this.$router.push({ name: 'admin-users' })
        })
      })
    },
    updatePassword (username, password) {
      this.updateUserPassword({ username, password }).then(() => {
        this.password = { newPassword: '', confirmPassword: '' }
        // this.$store.commit('showNotification', { text: this.$t('profile.password.messagePasswordUpdated') })
      })
    },
    ...mapActions({
      findUserByUsername: 'user/findUserByUsername',
      findUsers: 'user/findUsers',
      saveUser: 'user/saveUser',
      updateUserPassword: 'user/updateUserPassword'
    }),
    ...mapMutations({
      setUser: 'user/setUser'
    })
  },
  mounted () {
    if (this.$route.params.id === '+') {
      this.setUser({})
    } else {
      this.findUserByUsername(this.$route.params.id).then(user => {
        this.originalUsername = user.username
      })
    }
  },
  validate ({ params }) {
    return params.id === '+' || /^[a-z0-9]+$/i.test(params.id)
  }
}
</script>
