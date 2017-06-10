<template>
  <div class="row">
    <confirm-dialog id="confirm-delete" title="Confirm Delete Role" @dialog-confirm="deleteRole(role)">
      Are you sure you want to delete <strong v-text="role.code"></strong>?
    </confirm-dialog>
    <div class="col-xs-12 col-md-3">
      <h2>
        Roles <br />
      </h2>
      <p class="text-muted">Add or modify role</p>
      <hr />
      <b-button variant="primary" :to="{ name: 'role-form', params: { id: '+' } }">
        <i class="fa fa-plus"></i> New role
      </b-button>
    </div>
    <div class="col-xs-12 col-md-9">
      <div class="row">
        <div class="col-xs-2 col-md-6">
          <select class="custom-select" v-model.number="roles.size" @change="findRoles($route.query.q, 1, roles.size)">
            <option v-for="rs in roleSizeOptions" v-text="rs"></option>
          </select>
          <b-button @click="findRoles($route.query.q, $route.query.page, $route.query.size)">
            <i class="fa fa-refresh"></i>
          </b-button>
        </div>
        <div class="col-xs-10 col-md-6">
          <form @submit.prevent @submit="findRoles(q, $route.query.page, $route.query.size)">
            <b-input-group class="">
              <b-form-input placeholder="Keywords" v-model="q"></b-form-input>
              <b-input-group-button slot="right">
                <b-button variant="primary">
                  <i class="fa fa-search"></i>
                </b-button>
              </b-input-group-button>
            </b-input-group>
          </form>
        </div>
      </div>
      <br />
      <b-table hover responsive striped :items="roles.content" :fields="fields" :per-page="roles.size">
        <template slot="itemNumber" scope="item">
          {{ item.index + (roles.size * roles.number) - roles.size + 1 }}
        </template>
        <template slot="code" scope="item">
          <router-link :to="{ name: 'role-form', params: { id: item.value } }" v-text="item.value"></router-link>
        </template>
        <template slot="action" scope="item">
          <b-button variant="danger" size="sm" v-b-modal.confirm-delete @click="role = item.item">
            <i class="fa fa-close"></i>
          </b-button>
        </template>
      </b-table>
      <div>
        <b-pagination size="md" :total-rows="roles.totalElements" :per-page="roles.size" v-model.number="roles.number" @input="findRoles(q, roles.number, roles.size)" />
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmDialog from 'components/ConfirmDialog';

export default {
  components: {
    ConfirmDialog
  },
  data() {
    return {
      role: {},
      q: '',
      roleSizeOptions: [5, 10, 20, 50, 100],
      fields: {
        itemNumber: { label: '#' },
        code: { label: 'Code' },
        description: { label: 'Description' },
        action: { label: 'Action' }
      }
    }
  },
  computed: {
    roles() {
      return this.$store.state.role.roles;
    }
  },
  methods: {
    findRoles(q = '', page = 1, size = 20) {
      this.q = q;
      this.$router.push({ query: { q, page, size } });
      this.$store.dispatch('findRoles', { q, page, size });
    },
    deleteRole(role) {
      const self = this;
      this.$store.dispatch('deleteRole', role.id).then(() => {
        self.$store.commit('showNotification', { text: `${role.code} deleted` });
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
