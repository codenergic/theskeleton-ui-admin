<template>
  <div>
    <confirm-dialog id="confirm-delete" :title="$t('common.deleteConfirm')" @dialog-confirm="remove(role)">
      <i18n path="common.deleteConfirmation" tag="span">
        <strong v-text="role.rolename"></strong>
      </i18n>
    </confirm-dialog>
    <b-card>
      <template slot="header">
        <b-button variant="primary" class="my-0" :to="{ name: 'admin-roles-id', params: { id: '+' } }">
          <i class="fa fa-plus"></i>
          {{ $t('common.addNew', [$t('admin.role.label')]) }}
        </b-button>
      </template>
      <div>
        <search-box-pagination :query="q" :page-size="paginationLimit" @search="v => find(v.query, $route.query.page, v.pageSize)"></search-box-pagination>
        <b-table hover small responsive="sm" class="my-3" :items="roles.content" :fields="fields" :per-page="paginationLimit">
          <template #cell(itemNumber)="item">
            {{ item.index + (roles.size * roles.number) - roles.size + 1 }}
          </template>
          <template #cell(code)="item">
            <router-link :to="{ name: 'admin-roles-id', params: { id: item.value } }" v-text="item.value"></router-link>
          </template>
          <template #cell(privileges)="item">
            <b-button :class="['btn-sm']" :to="{ name: 'admin-roles-id-privileges', params: { id: item.item.code } }">
              <i class="fa fa-plus"></i>
            </b-button>
          </template>
          <template #cell(action)="item">
            <router-link :class="['btn', 'btn-secondary', 'btn-sm']" :to="{ name: 'admin-roles-id', params: { id: item.item.code } }" :title="$t('common.modify', [ '', item.item.code ])">
              <i class="fa fa-pencil"></i>
            </router-link>
            <b-button v-b-modal.confirm-delete variant="danger" size="sm" :title="$t('common.delete', [ role.code ])" @click="role=item.item">
              <i class="fa fa-close"></i>
            </b-button>
          </template>
        </b-table>
        <div>
          <b-pagination v-model.number="roles.number" size="md" :total-rows="roles.totalElements" :per-page="paginationLimit" @input="find(q, roles.number, paginationLimit)" />
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
      role: {},
      q: ''
    }
  },
  computed: {
    fields () {
      return [
        { key: 'itemNumber', label: '#' },
        { key: 'code', label: this.$t('admin.role.labelCode') },
        { key: 'description', label: this.$t('admin.role.labelDescription') },
        { key: 'privileges', label: this.$t('admin.role.labelPrivileges') },
        { key: 'action', label: this.$t('common.action') }
      ]
    },
    ...mapState({
      roles: state => state.role.roles,
      paginationLimit: state => state.page.paginationLimit
    })
  },
  methods: {
    find (code = '', page = 1, size = 20) {
      this.q = code
      this.$router.push({ query: { q: code, page, size } })
      this.findRole({ q: code, page, size })
      this.setPaginationLimit(size)
    },
    remove (role) {
      this.removeRole(role.rolename).then(() => {
        // self.$store.commit('showNotification', { text: self.$t('common.deleteSuccess', [ role.rolename ]) })
        this.find(this.$route.query.q, this.$route.query.page, this.$route.query.size)
        this.role = {}
      })
    },
    ...mapActions({
      findRole: 'role/findRoles',
      removeRole: 'role/deleteRole'
    }),
    ...mapMutations({
      setRole: 'role/setRole',
      setPaginationLimit: 'page/setPaginationLimit'
    })
  },
  mounted () {
    this.setRole({})
    if (!this.roles.content) {
      this.find(this.$route.query.q, this.$route.query.page, this.$route.query.size)
    }
  }
}
</script>
