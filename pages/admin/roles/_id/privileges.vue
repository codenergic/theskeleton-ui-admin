<template>
  <div>
    <b-card>
      <template slot="header">
        <b-button variant="primary" class="my-0" :to="{ name: 'admin-roles' }">
          <i class="fa fa-list"></i>
          {{ $t('common.view', [$t('admin.role.label')]) }}
        </b-button>
      </template>
      <form method="post" @submit.prevent>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <div class="form-group">
              <label for="code" v-text="$t('admin.role.labelCode')"></label>
              <b-form-input id="code" v-model="role.code" readonly name="code"></b-form-input>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6">
            <div class="form-group">
              <label for="description" v-text="$t('admin.role.labelDescription')"></label>
              <b-form-input id="description" v-model="role.description" readonly name="description"></b-form-input>
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
            <b-form-checkbox :title="privilege.description" :checked="isAssigned(privilege)" @change="assign($event, privilege)">
              {{ privilege.name }}
            </b-form-checkbox>
          </div>
        </div>
      </form>
    </b-card>
  </div>
</template>

<script>
import SearchBox from '~/components/SearchBox'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    SearchBox
  },
  data () {
    return {
      q: ''
    }
  },
  computed: {
    ...mapState({
      privileges: state => state.privilege.privileges.content,
      role: state => state.role.role,
      rolePrivileges (state) {
        return state.role.privileges[state.role.role.code]
      }
    })
  },
  methods: {
    initData () {
      this.findRoleByCode(this.$route.params.id).then(role => {
        this.findRolePrivilegesByCode(role.code)
      })
      this.findPrivileges({ q: this.q, size: 100, page: 1 })
    },
    isAssigned (privilege) {
      for (const p in this.rolePrivileges) {
        const assigned = this.rolePrivileges[p]
        if (privilege.name === assigned.name) {
          return true
        }
      }
      return false
    },
    assign (assign, privilege) {
      if (assign) {
        this.assignPrivilegeToRole({ code: this.role.code, privilege: privilege.name }).then(this.initData)
      } else {
        this.removePrivilegeFromRole({ code: this.role.code, privilege: privilege.name }).then(this.initData)
      }
    },
    ...mapActions({
      assignPrivilegeToRole: 'role/assignPrivilegeToRole',
      findPrivileges: 'privilege/findPrivileges',
      findRoleByCode: 'role/findRoleByCode',
      findRolePrivilegesByCode: 'role/findRolePrivilegesByCode',
      removePrivilegeFromRole: 'role/removePrivilegeFromRole'
    })
  },
  mounted () {
    this.initData()
  }
}
</script>
