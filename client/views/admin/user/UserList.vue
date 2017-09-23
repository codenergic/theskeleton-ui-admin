<template>
  <main-layout>
    <module-title slot="menu" :title="$t('admin.user.title')" :subtitle="$t('common.addOrModify', [$t('admin.user.label')])">
      <b-button variant="primary" :to="{ name: 'user-form', params: { id: '+' } }">
        <i class="fa fa-plus"></i> {{ $t('common.addNew', [$t('admin.user.label')]) }}
      </b-button>
    </module-title>
    <template slot="content">
      <confirm-dialog id="confirm-delete" :title="$t('common.deleteConfirm')" @dialog-confirm="deleteUser(user)">
        <i18n path="common.deleteConfirmation" tag="span">
          <strong v-text="user.username"></strong>
        </i18n>
      </confirm-dialog>
      <search-box-pagination :query="q" :page-size="$store.state.paginationLimit" @search="v => findUsers(v.query, $route.query.page, v.pageSize)"></search-box-pagination>
      <br />
      <b-table hover striped small responsive :items="users.content" :fields="fields" :per-page="$store.state.paginationLimit">
        <template slot="itemNumber" scope="item">
          {{ item.index + (users.size * users.number) - users.size + 1 }}
        </template>
        <template slot="username" scope="item">
          <router-link :to="{ name: 'user-form', params: { id: item.value } }" v-text="item.value"></router-link>
        </template>
        <template slot="email" scope="item">
          <a :href="'mailto:' + item.value">
            <i class="fa fa-envelope"></i>
          </a>
          {{ item.value }}
        </template>
        <template slot="unlocked" scope="item">
          <i :class="['fa', item.item.isNonLocked ? 'text-success fa-check' : 'text-danger fa-close']"></i>
        </template>
        <template slot="roles" scope="item">
          <b-badge v-for="r in roles[item.item.username]" :key="r" v-text="r.code"></b-badge>
          <b-button :class="['btn-sm']" :to="{ name: 'user-role-form', params: { id: item.item.username } }">
            <i class="fa fa-plus"></i>
          </b-button>
        </template>
        <template slot="action" scope="item">
          <b-button variant="secondary" size="sm" v-if="item.item.isNonLocked" @click="lockUnlockUser(item.item, false)" :title="$t('common.lock', [ '', item.item.username ])">
            <i class="fa fa-lock"></i>
          </b-button>
          <b-button variant="secondary" size="sm" v-else @click="lockUnlockUser(item.item, true)" :title="$t('common.unlock', [ '', item.item.username ])">
            <i class="fa fa-unlock"></i>
          </b-button>
          <router-link :class="['btn', 'btn-secondary', 'btn-sm']" :to="{ name: 'user-form', params: { id: item.item.username } }" :title="$t('common.modify', [ '', item.item.username ])">
            <i class="fa fa-pencil"></i>
          </router-link>
          <b-button variant="danger" size="sm" v-b-modal.confirm-delete @click="user=item.item" :title="$t('common.delete', [ user.username ])">
            <i class="fa fa-close"></i>
          </b-button>
        </template>
      </b-table>
      <div>
        <b-pagination size="md" :total-rows="users.totalElements" :per-page="$store.state.paginationLimit" v-model.number="users.number" @input="findUsers(q, users.number, $store.state.paginationLimit)" />
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
      user: {},
      q: '',
      userSizeOptions: [5, 10, 20, 50, 100]
    }
  },
  computed: {
    fields() {
      return {
        itemNumber: { label: '#' },
        username: { label: this.$t('admin.user.labelUsername') },
        email: { label: this.$t('admin.user.labelEmail') },
        unlocked: { label: this.$t('admin.user.labelUnlocked') },
        roles: { label: this.$t('admin.user.labelRoles') },
        action: { label: this.$t('common.action') }
      }
    },
    users() {
      return this.$store.state.user.users;
    },
    roles() {
      return this.$store.state.user.roles;
    }
  },
  methods: {
    findUsers(username = '', page = 1, size = 20) {
      this.q = username;
      this.$router.push({ query: { q: username, page, size } });
      this.$store.dispatch('findUsers', { username, page, size });
      this.$store.commit('setPaginationLimit', size);
    },
    deleteUser(user) {
      const self = this;
      this.$store.dispatch('deleteUser', user.username).then(() => {
        self.$store.commit('showNotification', { text: self.$t('common.deleteSuccess', [ user.username ]) });
        self.findUsers(this.$route.query.q, this.$route.query.page, this.$route.query.size);
        self.user = {};
      });
    },
    lockUnlockUser({ username }, unlocked) {
      this.$store.dispatch('lockUnlockUser', { username, unlocked }).then(() => {
        this.findUsers(this.$route.query.q, this.$route.query.page, this.$route.query.size);
        this.user = {};
      });
    }
  },
  mounted() {
    this.$store.commit('setUser', {});
    if (!this.users.content) {
      this.findUsers(this.$route.query.q, this.$route.query.page, this.$route.query.size);
    }
  }
}
</script>
