<template>
  <b-card>
    <form @submit.prevent="update(password)">
      <div class="form-group">
        <label for="new-password" v-text="$t('profile.password.labelPasswordNew')"></label>
        <b-form-input id="new-password" v-model="password.newPassword" name="new-password" type="password"></b-form-input>
      </div>
      <div class="form-group">
        <label for="confirm-new-password" v-text="$t('profile.password.labelPasswordConfirm')"></label>
        <b-form-input id="confirm-new-password" v-model="password.confirmPassword" name="confirm-new-password" type="password"></b-form-input>
      </div>
      <div>
        <b-button variant="primary" :disabled="!passwordMatch">
          <i class="fa fa-floppy-o"></i> {{ $t('common.update', []) }}
        </b-button>
      </div>
    </form>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      password: {
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    passwordMatch () {
      if (this.password.newPassword === undefined || this.password.newPassword === '') {
        return false
      }
      return this.password.newPassword === this.password.confirmPassword
    }
  },
  methods: {
    update (password) {
      this.updatePassword(password).then(() => {
        this.password = { newPassword: '', confirmPassword: '' }
        // this.$store.commit('showNotification', { text: this.$t('profile.password.messagePasswordUpdated') })
      })
    },
    ...mapActions({
      updatePassword: 'profile/updateCurrentUserPassword'
    })
  }
}
</script>
