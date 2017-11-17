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
          <template slot="itemNumber" scope="item">
            {{ item.index + (users.size * users.number) - users.size + 1 }}
          </template>
          <template slot="username" scope="item">
            <router-link :to="{ name: 'admin-users-id', params: { id: item.value } }" v-text="item.value"></router-link>
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
            <b-badge v-for="r in roles[item.item.username]" :key="r.code" v-text="r.code" class="mr-1"></b-badge>
            <b-button size="sm" :to="{ name: 'admin-users-id-roles', params: { id: item.item.username } }">
              <i class="fa fa-plus"></i>
            </b-button>
          </template>
          <template slot="action" scope="item">
            <b-button variant="secondary" size="sm" v-if="item.item.isNonLocked" @click="lockUnlock(item.item, false)" :title="$t('common.lock', [ '', item.item.username ])">
              <i class="fa fa-lock"></i>
            </b-button>
            <b-button variant="secondary" size="sm" v-else @click="lockUnlock(item.item, true)" :title="$t('common.unlock', [ '', item.item.username ])">
              <i class="fa fa-unlock"></i>
            </b-button>
            <b-button variant="secondary" size="sm" :to="{ name: 'admin-users-id', params: { id: item.item.username } }" :title="$t('common.modify', [ '', item.item.username ])">
              <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" size="sm" v-b-modal.confirm-delete @click="user=item.item" :title="$t('common.delete', [ user.username ])">
              <i class="fa fa-close"></i>
            </b-button>
          </template>
        </b-table>
        <div>
          <b-pagination size="md" :total-rows="users.totalElements" :per-page="paginationLimit" v-model.number="users.number" @input="find(q, users.number, paginationLimit)" />
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
      return {
        itemNumber: { label: '#' },
        username: { label: this.$t('admin.user.labelUsername') },
        email: { label: this.$t('admin.user.labelEmail') },
        unlocked: { label: this.$t('admin.user.labelUnlocked') },
        roles: { label: this.$t('admin.user.labelRoles') },
        action: { label: this.$t('common.action') }
      }
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
