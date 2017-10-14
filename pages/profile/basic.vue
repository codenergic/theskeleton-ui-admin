<template>
  <b-card>
    <form @submit.prevent @submit="updateCurrentUser(currentUser)">
      <div class="form-group">
        <label for="username" v-text="$t('profile.basic.labelUsername')"></label>
        <b-form-input id="username" name="username" v-model="currentUser.username"></b-form-input>
        <small class="text-warning" v-text="$t('profile.basic.messageChangeUsername')"></small>
      </div>
      <div class="form-group">
        <label for="email" v-text="$t('profile.basic.labelEmail')"></label>
        <b-form-input id="email" name="email" type="email" v-model="currentUser.email"></b-form-input>
      </div>
      <div>
        <b-button variant="primary" type="submit">
          <i class="fa fa-floppy-o"></i>
          {{ $t('common.update', []) }}
        </b-button>
      </div>
    </form>
  </b-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      currentUser: {}
    }
  },
  computed: {
    ...mapState({
      profileCurrentUser: state => state.profile.loggedInUser
    })
  },
  methods: {
    update (user) {
      const usernameChanged = user.username !== this.profileCurrentUser.username
      this.updateCurrentUser(user).then(data => {
        if (usernameChanged) {
          this.deleteSession().then(() => {
            window.location.href = `${window.location.origin}/auth/logout`
          })
        }
      })
    },
    ...mapActions({
      deleteSession: 'auth/deleteSession',
      findCurrentUser: 'profile/findCurrentUser',
      updateCurrentUser: 'profile/updateCurrentUser'
    })
  },
  mounted () {
    if (!this.profileCurrentUser.username) {
      this.findCurrentUser().then(user => {
        this.currentUser = Object.assign({}, user)
      })
    } else {
      this.currentUser = Object.assign({}, this.profileCurrentUser)
    }
  }
}
</script>
