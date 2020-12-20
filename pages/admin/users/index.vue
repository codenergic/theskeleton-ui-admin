<template>
  <div>
    <confirm-dialog id="confirm-delete" :title="$t('common.deleteConfirm')" @dialog-confirm="remove(user)">
      <i18n path="common.deleteConfirmation" tag="span">
        <strong v-text="user.username"></strong>
      </i18n>
    </confirm-dialog>
    <b-card>
      <template slot="header">
        <b-button variant="primary" class="my-0" :to="{ name: 'admin-users-id', params: { id: '+' } }">
          <i class="fa fa-plus"></i>
          {{ $t('common.addNew', [$t('admin.user.label')]) }}
        </b-button>
      </template>
      <div>
        <search-box-pagination :query="q" :page-size="paginationLimit" @search="v => find(v.query, $route.query.page, v.pageSize)"></search-box-pagination>
        <b-table hover small responsive="sm" class="my-3" :items="users.content" :fields="fields" :per-page="paginationLimit">
          <template #cell(itemNumber)="item">
            {{ item.index + (users.size * users.number) - users.size + 1 }}
          </template>
          <template #cell(username)="item">
            <router-link :to="{ name: 'admin-users-id', params: { id: item.value } }" v-text="item.value"></router-link>
          </template>
          <template #cell(email)="item">
            <a :href="'mailto:' + item.value">
              <i class="fa fa-envelope"></i>
            </a>
            {{ item.value }}
          </template>
          <template #cell(unlocked)="item">
            <i :class="['fa', item.item.isNonLocked ? 'text-success fa-check' : 'text-danger fa-close']"></i>
          </template>
          <template #cell(roles)="item">
            <b-badge v-for="r in roles[item.item.username]" :key="r.code" class="mr-1" v-text="r.code"></b-badge>
            <b-button size="sm" :to="{ name: 'admin-users-id-roles', params: { id: item.item.username } }">
              <i class="fa fa-plus"></i>
            </b-button>
          </template>
          <template #cell(action)="item">
            <b-button v-if="item.item.isNonLocked" variant="secondary" size="sm" :title="$t('common.lock', [ '', item.item.username ])" @click="lockUnlock(item.item, false)">
              <i class="fa fa-lock"></i>
            </b-button>
            <b-button v-else variant="secondary" size="sm" :title="$t('common.unlock', [ '', item.item.username ])" @click="lockUnlock(item.item, true)">
              <i class="fa fa-unlock"></i>
            </b-button>
            <b-button variant="secondary" size="sm" :to="{ name: 'admin-users-id', params: { id: item.item.username } }" :title="$t('common.modify', [ '', item.item.username ])">
              <i class="fa fa-pencil"></i>
            </b-button>
            <b-button v-b-modal.confirm-delete variant="danger" size="sm" :title="$t('common.delete', [ user.username ])" @click="user=item.item">
              <i class="fa fa-close"></i>
            </b-button>
          </template>
        </b-table>
        <div>
          <b-pagination v-model.number="users.number" size="md" :total-rows="users.totalElements" :per-page="paginationLimit" @input="find(q, users.number, paginationLimit)" />
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import ConfirmDialog from '~/components/ConfirmDialog'
import SearchBoxPagination from '~/components/SearchBoxPagination'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {
    ConfirmDialog,
    SearchBoxPagination
  },
  data () {
    return {
      user: {},
      q: ''
    }
  },
  computed: {
    fields () {
      return [
        { key: 'itemNumber', label: '#' },
        { key: 'username', label: this.$t('admin.user.labelUsername') },
        { key: 'email', label: this.$t('admin.user.labelEmail') },
        { key: 'unlocked', label: this.$t('admin.user.labelUnlocked') },
        { key: 'roles', label: this.$t('admin.user.labelRoles') },
        { key: 'action', label: this.$t('common.action') }
      ]
    },
    ...mapState({
      users: state => state.user.users,
      roles: state => state.user.roles,
      paginationLimit: state => state.page.paginationLimit
    })
  },
  methods: {
    find (username = '', page = 1, size = 20) {
      this.q = username
      this.$router.push({ query: { q: username, page, size } })
      this.findUser({ username, page, size })
      this.setPaginationLimit(size)
    },
    remove (user) {
      this.removeUser(user.username).then(() => {
        // self.$store.commit('showNotification', { text: self.$t('common.deleteSuccess', [ user.username ]) })
        this.find(this.$route.query.q, this.$route.query.page, this.$route.query.size)
        this.user = {}
      })
    },
    lockUnlock ({ username }, unlocked) {
      this.lockUnlockUser({ username, unlocked }).then(() => {
        this.find(this.$route.query.q, this.$route.query.page, this.$route.query.size)
        this.user = {}
      })
    },
    ...mapActions({
      findUser: 'user/findUsers',
      lockUnlockUser: 'user/lockUnlockUser',
      removeUser: 'user/deleteUser'
    }),
    ...mapMutations({
      setUser: 'user/setUser',
      setPaginationLimit: 'page/setPaginationLimit'
    })
  },
  mounted () {
    this.setUser({})
    if (!this.users.content) {
      this.find(this.$route.query.q, this.$route.query.page, this.$route.query.size)
    }
  }
}
</script>
