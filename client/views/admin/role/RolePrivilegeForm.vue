<template>
  <main-layout>
    <module-title slot="menu" :title="$t('admin.role.title')" :subtitle="$t('admin.role.subtitleAssignPrivilege')">
      <b-button :to="{ name: 'role-list' }">
        <i class="fa fa-list"></i> {{ $t('common.view', [$t('admin.role.label')]) }}
      </b-button>
    </module-title>
    <form slot="content" method="post" @submit.prevent>
      <div class="row">
        <div class="col-xs-12 col-sm-6">
          <div class="form-group">
            <label for="code" v-text="$t('admin.role.labelCode')"></label>
            <b-form-input readonly id="code" name="code" v-model="role.code"></b-form-input>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6">
          <div class="form-group">
            <label for="description" v-text="$t('admin.role.labelDescription')"></label>
            <b-form-input readonly id="description" name="description" v-model="role.description"></b-form-input>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div class="form-group">
            <label v-text="$t('admin.role.labelPrivileges')"></label>
            <search-box v-model="q" @search="initData"></search-box>
          </div>
        </div>
      </div>
      <div class="form-group d-flex flex-wrap">
        <div v-for="privilege in privileges" :key="privilege.name">
          <b-form-checkbox :title="privilege.description" :checked="isPrivilegeAssigned(privilege)" @change="assignPrivilege($event, privilege)">
            {{ privilege.name }}
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
    privileges() {
      return this.$store.state.privilege.privileges.content;
    },
    role() {
      return this.$store.state.role.role;
    },
    rolePrivileges() {
      return this.$store.state.role.privileges[this.role.code];
    }
  },
  data() {
    return {
      q: ''
    }
  },
  methods: {
    initData() {
      this.$store.dispatch('findRoleByCode', this.$route.params.id).then(role => {
        this.$store.dispatch('findRolePrivilegesByCode', role.code);
      });
      this.$store.dispatch('findPrivileges', { q: this.q, size: 100, page: 1 });
    },
    isPrivilegeAssigned(privilege) {
      for (const p in this.rolePrivileges) {
        const assigned = this.rolePrivileges[p];
        if (privilege.name === assigned.name) {
          return true;
        }
      }
      return false;
    },
    assignPrivilege(assign, privilege) {
      if (assign) {
        this.$store.dispatch('assignPrivilegeToRole', { code: this.role.code, privilege: privilege.name}).then(this.initData);
      } else {
        this.$store.dispatch('removePrivilegeFromRole', { code: this.role.code, privilege: privilege.name}).then(this.initData);
      }
    }
  },
  mounted() {
    this.initData();
  }
}
</script>
