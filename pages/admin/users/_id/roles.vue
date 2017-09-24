<template>
  <div>
    <b-card>
      <template slot="header">
        <b-button variant="primary" class="my-0" :to="{ name: 'admin-users' }">
          <i class="fa fa-list"></i>
          {{ $t('common.view', [$t('admin.user.label')]) }}
        </b-button>
      </template>
      <form method="post" @submit.prevent>
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
      roles: state => state.role.roles.content,
      user: state => state.user.user,
      userRoles (state) {
        return state.user.roles[this.user.username]
      }
    })
  },
  methods: {
    initData () {
      this.findUserByUsername(this.$route.params.id).then(user => {
        this.findUserRolesByUsername(user.username)
      })
      this.findRoles({ q: this.q, size: 100, page: 1 })
    },
    isRoleAssigned (role) {
      for (const r in this.userRoles) {
        const assigned = this.userRoles[r]
        if (role.code === assigned.code) {
          return true
        }
      }
      return false
    },
    assignRole (assign, role) {
      if (assign) {
        this.assignRoleToUser({ username: this.user.username, role: role.code }).then(this.initData)
      } else {
        this.removeRoleFromUser({ username: this.user.username, role: role.code }).then(this.initData)
      }
    },
    ...mapActions({
      assignRoleToUser: 'user/assignRoleToUser',
      findRoles: 'role/findRoles',
      findUserByUsername: 'user/findUserByUsername',
      findUserRolesByUsername: 'user/findUserRolesByUsername',
      removeRoleFromUser: 'user/removeRoleFromUser'
    })
  },
  mounted () {
    this.initData()
  }
}
</script>
