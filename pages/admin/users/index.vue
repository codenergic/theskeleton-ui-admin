<template>
  <div>
    <b-card>
      <template slot="header">
        <b-button variant="primary" class="my-0">
          <i class="fa fa-plus"></i>
          {{ $t('common.addNew', [$t('admin.user.label')]) }}
        </b-button>
      </template>
      <div>
        <confirm-dialog id="confirm-delete" :title="$t('common.deleteConfirm')" @dialog-confirm="deleteUser(user)">
          <i18n path="common.deleteConfirmation" tag="span">
            <strong v-text="user.username"></strong>
          </i18n>
        </confirm-dialog>
        <search-box-pagination :query="q" :page-size="paginationLimit" @search="v => findUsers(v.query, $route.query.page, v.pageSize)"></search-box-pagination>
        <b-table hover small responsive class="my-3" :items="users.content" :fields="fields" :per-page="paginationLimit">
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
            <b-button size="sm" class="ml-1" :to="{ name: 'user-role-form', params: { id: item.item.username } }">
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
            <b-button variant="secondary" size="sm" :to="{ name: 'user-form', params: { id: item.item.username } }" :title="$t('common.modify', [ '', item.item.username ])">
              <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" size="sm" v-b-modal.confirm-delete @click="user=item.item" :title="$t('common.delete', [ user.username ])">
              <i class="fa fa-close"></i>
            </b-button>
          </template>
        </b-table>
        <div>
          <b-pagination size="md" :total-rows="users.totalElements" :per-page="paginationLimit" v-model.number="users.number" @input="findUsers(q, users.number, paginationLimit)" />
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
    findUsers (username = '', page = 1, size = 20) {
      this.q = username
      this.$router.push({ query: { q: username, page, size } })
      this.doFindUsers({ username, page, size })
      this.setPaginationLimit(size)
    },
    deleteUser (user) {
      this.doDeleteUser(user.username).then(() => {
        // self.$store.commit('showNotification', { text: self.$t('common.deleteSuccess', [ user.username ]) })
        this.findUsers(this.$route.query.q, this.$route.query.page, this.$route.query.size)
        this.user = {}
      })
    },
    lockUnlockUser ({ username }, unlocked) {
      this.doLockUnlockUser({ username, unlocked }).then(() => {
        this.findUsers(this.$route.query.q, this.$route.query.page, this.$route.query.size)
        this.user = {}
      })
    },
    ...mapActions({
      doDeleteUser: 'user/deleteUser',
      doFindUsers: 'user/findUsers',
      doLockUnlockUser: 'user/lockUnlockUser'
    }),
    ...mapMutations({
      setUser: 'user/setUser',
      setPaginationLimit: 'page/setPaginationLimit'
    })
  },
  mounted () {
    this.setUser({})
    if (!this.users.content) {
      this.findUsers(this.$route.query.q, this.$route.query.page, this.$route.query.size)
    }
  }
}
</script>
