<template>
  <div>
    <b-card>
      <template slot="header">
        <b-button variant="primary" class="my-0" :to="{ name: 'admin-roles' }">
          <i class="fa fa-list"></i>
          {{ $t('common.view', [$t('admin.role.label')]) }}
        </b-button>
      </template>
      <form method="post" @submit.prevent @submit="save(role)">
        <div class="form-group">
          <label for="code" v-text="$t('admin.role.labelCode')"></label>
          <b-form-input id="code" v-model="role.code" name="code"></b-form-input>
        </div>
        <div class="form-group">
          <label for="description" v-text="$t('admin.role.labelDescription')"></label>
          <b-form-input id="description" v-model="role.description" name="description" textarea :rows="3"></b-form-input>
        </div>
        <div>
          <b-button variant="primary" type="submit">
            <i class="fa fa-floppy-o"></i> {{ role.id ? $t('common.update', []) : $t('common.save') }}
          </b-button>
        </div>
      </form>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      originalRole: {}
    }
  },
  computed: {
    addOrModifyLabel () {
      const roleLabel = this.$t('admin.role.label')
      return this.role.id ? this.$t('common.modify', [roleLabel, this.originalRole.code]) : this.$t('common.addNew', [roleLabel])
    },
    ...mapState({
      role: state => Object.assign({}, state.role.role)
    })
  },
  methods: {
    save (role) {
      role.id = this.originalRole.code
      this.saveRole(role).then(r => {
        this.findRoles({ q: r.code }).then(() => {
          this.$router.push({ name: 'admin-roles', query: { q: r.code } })
        })
      })
    },
    ...mapActions({
      findRoleByCode: 'role/findRoleByCode',
      findRoles: 'role/findRoles',
      saveRole: 'role/saveRole'
    }),
    ...mapMutations({
      setRole: 'role/setRole'
    })
  },
  mounted () {
    if (this.$route.params.id === '+') {
      this.setRole({})
    } else {
      this.findRoleByCode(this.$route.params.id).then(role => {
        this.originalRole = role
      })
    }
  },
  validate ({ params }) {
    return params.id === '+' || /^[a-z0-9]+$/i.test(params.id)
  }
}
</script>
