<template>
  <main-layout>
    <module-title slot="menu" :title="$t('admin.role.title')" :subtitle="$t('common.addOrModify', [$t('admin.role.label')])">
      <b-button variant="primary" :to="{ name: 'role-form', params: { id: '+' } }">
        <i class="fa fa-plus"></i> {{ $t('common.addNew', [$t('admin.role.label')]) }}
      </b-button>
    </module-title>
    <template slot="content">
      <confirm-dialog id="confirm-delete" :title="$t('common.deleteConfirm')" @dialog-confirm="deleteRole(role)">
        <i18n path="common.deleteConfirmation" tag="span">
          <strong v-text="role.code"></strong>
        </i18n>
      </confirm-dialog>
      <search-box-pagination :query="q" :page-size="$store.state.paginationLimit" @search="v => findRoles(v.query, $route.query.page, v.pageSize)"></search-box-pagination>
      <br />
      <b-table hover responsive striped :items="roles.content" :fields="fields" :per-page="$store.state.paginationLimit">
        <template slot="itemNumber" scope="item">
          {{ item.index + (roles.size * roles.number) - roles.size + 1 }}
        </template>
        <template slot="code" scope="item">
          <router-link :to="{ name: 'role-form', params: { id: item.value } }" v-text="item.value"></router-link>
        </template>
        <template slot="action" scope="item">
          <router-link :class="['btn', 'btn-secondary', 'btn-sm']" :to="{ name: 'role-form', params: { id: item.item.code } }" :title="$t('common.modify', [ '', item.item.code ])">
            <i class="fa fa-pencil"></i>
          </router-link>
          <b-button variant="danger" size="sm" v-b-modal.confirm-delete @click="role=item.item" :title="$t('common.delete', [ role.code ])">
            <i class="fa fa-close"></i>
          </b-button>
        </template>
      </b-table>
      <div>
        <b-pagination size="md" :total-rows="roles.totalElements" :per-page="$store.state.paginationLimit" v-model.number="roles.number" @input="findRoles(q, roles.number, $store.state.paginationLimit)" />
      </div>
    </template>
  </main-layout>
</template>

<script>
import ConfirmDialog from 'components/ConfirmDialog';
import MainLayout from 'components/MainLayout';
import ModuleTitle from 'components/ModuleTitle';
import SearchBoxPagination from 'components/SearchBoxPagination';

export default {
  components: {
    ConfirmDialog,
    MainLayout,
    ModuleTitle,
    SearchBoxPagination
  },
  data() {
    return {
      role: {},
      q: '',
      roleSizeOptions: [5, 10, 20, 50, 100]
    }
  },
  computed: {
    fields() {
      return {
        itemNumber: { label: '#' },
        code: { label: this.$t('admin.role.labelCode') },
        description: { label: this.$t('admin.role.labelDescription') },
        action: { label: this.$t('common.action') }
      }
    },
    roles() {
      return this.$store.state.role.roles;
    }
  },
  methods: {
    findRoles(q = '', page = 1, size = 20) {
      this.q = q;
      this.$router.push({ query: { q, page, size } });
      this.$store.dispatch('findRoles', { q, page, size });
      this.$store.commit('setPaginationLimit', size);
    },
    deleteRole(role) {
      const self = this;
      this.$store.dispatch('deleteRole', role.id).then(() => {
        self.$store.commit('showNotification', { text: self.$t('common.deleteSuccess', [ role.code ]) });
        self.findRoles(this.$route.query.q, this.$route.query.page, this.$route.query.size);
        self.role = {};
      });
    }
  },
  mounted() {
    if (!this.roles.content) {
      this.findRoles(this.$route.query.q, this.$route.query.page, this.$route.query.size);
    }
  }
}
</script>
