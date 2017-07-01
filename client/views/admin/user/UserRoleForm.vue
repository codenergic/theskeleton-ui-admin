<template>
  <main-layout>
    <module-title slot="menu" :title="$t('admin.user.title')" :subtitle="$t('admin.user.subtitleAssignRole')">
      <b-button :to="{ name: 'user-list' }">
        <i class="fa fa-list"></i> {{ $t('common.view', [$t('admin.user.label')]) }}
      </b-button>
    </module-title>
    <form slot="content" method="post" @submit.prevent>
      <div class="row">
        <div class="col-xs-12 col-sm-6">
          <div class="form-group">
            <label for="code" v-text="$t('admin.user.labelUsername')"></label>
            <b-form-input readonly id="username" name="username" v-model="user.username"></b-form-input>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6">
          <div class="form-group">
            <label for="description" v-text="$t('admin.user.labelEmail')"></label>
            <b-form-input readonly id="email" name="email" email v-model="user.email"></b-form-input>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div class="form-group">
            <label v-text="$t('admin.user.labelRoles')"></label>
            <search-box v-model="q" @search="initData"></search-box>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div v-for="role in roles" :key="role.code">
          <b-form-checkbox :title="role.description" :checked="isRoleAssigned(role)" @change="assignRole($event, role)">
            {{ role.code }}
          </b-form-checkbox>
        </div>
      </div>
    </form>
  </main-layout>
</template>

<script>
import MainLayout from 'components/MainLayout';
import ModuleTitle from 'components/ModuleTitle';
import SearchBox from 'components/SearchBox';

export default {
  components: {
    MainLayout,
    ModuleTitle,
    SearchBox
  },
  computed: {
    roles() {
      return this.$store.state.role.roles.content;
    },
    user() {
      return this.$store.state.user.user;
    },
    userRoles() {
      return this.$store.state.user.roles[this.user.username];
    }
  },
  data() {
    return {
      q: ''
    }
  },
  methods: {
    initData() {
      this.$store.dispatch('findUserByUsername', this.$route.params.id).then(user => {
        this.$store.dispatch('findUserRolesByUsername', user.username);
      });
      this.$store.dispatch('findRoles', { q: this.q, size: 100, page: 1 });
    },
    isRoleAssigned(role) {
      for (const r in this.userRoles) {
        const assigned = this.userRoles[r];
        if (role.code === assigned.code) {
          return true;
        }
      }
      return false;
    },
    assignRole(assign, role) {
      if (assign) {
        this.$store.dispatch('assignRoleToUser', { username: this.user.username, role: role.code}).then(this.initData);
      } else {
        this.$store.dispatch('removeRoleFromUser', { username: this.user.username, role: role.code}).then(this.initData);
      }
    }
  },
  mounted() {
    this.initData();
  }
}
</script>
