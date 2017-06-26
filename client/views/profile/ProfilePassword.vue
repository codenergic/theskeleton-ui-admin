<template>
  <main-layout>
    <module-title slot="menu" :title="$t('profile.password.title')" :subtitle="$t('profile.password.subtitle')">
    </module-title>
    <div slot="content" class="row">
      <form class="col-xs-12 col-lg-8" @submit.prevent="updatePassword(password)">
        <div class="form-group">
          <label for="new-password" v-text="$t('profile.password.labelPasswordNew')"></label>
          <b-form-input id="new-password" name="new-password" type="password" v-model="password.newPassword"></b-form-input>
        </div>
        <div class="form-group">
          <label for="confirm-new-password" v-text="$t('profile.password.labelPasswordConfirm')"></label>
          <b-form-input id="confirm-new-password" name="confirm-new-password" type="password" v-model="password.confirmPassword"></b-form-input>
        </div>
        <div>
          <b-button variant="primary" :disabled="!passwordMatch">
            <i class="fa fa-floppy-o"></i> {{ $t('common.update', []) }}
          </b-button>
        </div>
      </form>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from 'components/MainLayout';
import ModuleTitle from 'components/ModuleTitle';

export default {
  components: {
    MainLayout,
    ModuleTitle
  },
  data() {
    return {
      password: {
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    passwordMatch() {
      if (this.password.newPassword === undefined || this.password.newPassword === '') {
        return false;
      }
      return this.password.newPassword === this.password.confirmPassword;
    }
  },
  methods: {
    updatePassword(password) {
      this.$store.dispatch('updateCurrentUserPassword', password).then(() => {
        this.password = { newPassword: '', confirmPassword: '' };
        this.$store.commit('showNotification', { text: this.$t('profile.password.messagePasswordUpdated') });
      });
    }
  }
}
</script>
