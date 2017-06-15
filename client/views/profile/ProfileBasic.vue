<template>
  <div>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-lg-3">
          <module-title :title="$t('profile.basic.title')" :subtitle="$t('profile.basic.subtitle')">
          </module-title>
        </div>
        <div class="col-xs-12 col-md-8 col-lg-6">
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
              <b-button variant="primary">
                <i class="fa fa-floppy-o"></i> {{ $t('common.update', []) }}
              </b-button>
            </div>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import ModuleTitle from 'components/ModuleTitle';

export default {
  components: {
    ModuleTitle
  },
  data() {
    return {
      currentUser: {}
    }
  },
  methods: {
    updateCurrentUser(user) {
      const vm = this;
      const usernameChanged = user.username !== vm.$store.getters.loggedInUser.username;
      this.$store.dispatch('updateCurrentUser', user).then(data => {
        if (usernameChanged) {
          vm.$store.dispatch('deleteSession');
          window.location.href = `${window.location.origin}/auth/logout`;
        }
      });
    }
  },
  mounted() {
    this.currentUser = Object.assign({}, this.$store.getters.loggedInUser);
  }
}
</script>
