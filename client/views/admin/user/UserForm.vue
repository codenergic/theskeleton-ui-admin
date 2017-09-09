<template>
  <main-layout>
    <module-title slot="menu" :title="$t('admin.user.title')" :subtitle="addOrModifyLabel">
      <b-button :to="{ name: 'user-list' }">
        <i class="fa fa-list"></i> {{ $t('common.view', [$t('admin.user.label')]) }}
      </b-button>
    </module-title>
    <template slot="content">
      <b-tabs>
        <b-tab :title="$t('profile.basic.title')">
          <br />
          <form method="post" @submit.prevent @submit="save(user)">
            <div class="form-group">
              <label for="code" v-text="$t('admin.user.labelUsername')"></label>
              <b-form-input id="username" name="username" v-model="user.username"></b-form-input>
            </div>
            <div class="form-group">
              <label for="description" v-text="$t('admin.user.labelEmail')"></label>
              <b-form-input id="email" name="email" email v-model="user.email"></b-form-input>
            </div>
            <div>
              <b-button variant="primary">
                <i class="fa fa-floppy-o"></i> {{ user.id ? $t('common.update', []) : $t('common.save') }}
              </b-button>
            </div>
          </form>
        </b-tab>
        <b-tab :title="$t('profile.password.title')" v-if="user.id">
          <br />
          <form @submit.prevent="updatePassword(user.username, password.confirmPassword)">
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
        </b-tab>
      </b-tabs>
    </template>
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
      originalUser: {},
      password: {
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    addOrModifyLabel() {
      const userLabel = this.$t('admin.user.label');
      return this.user.id ? this.$t('common.modify', [userLabel, this.originalUser.username]) : this.$t('common.addNew', [userLabel]);
    },
    passwordMatch() {
      if (this.password.newPassword === undefined || this.password.newPassword === '') {
        return false;
      }
      return this.password.newPassword === this.password.confirmPassword;
    }
  },
  methods: {
    save(user) {
      const router = this.$router;
      user.id = this.originalUser.username;
      this.$store.dispatch('saveUser', user).then(() => {
        this.$store.dispatch('findUsers', { q: user.username }).then(() => {
          router.push({ name: 'user-list' });
        });
      });
    },
    updatePassword(username, password) {
      this.$store.dispatch('updateUserPassword', { username, password}).then(() => {
        this.password = { newPassword: '', confirmPassword: '' };
        this.$store.commit('showNotification', { text: this.$t('profile.password.messagePasswordUpdated') });
      });
    }
  },
  mounted() {
    const self = this;
    if (this.$route.params.id === '+') {
      this.$store.commit('setUser', {});
    } else {
      this.$store.dispatch('findUserByUsername', this.$route.params.id).then(user => {
        self.originalUser = user;
      });
    }
  }
}
</script>
