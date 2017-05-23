<template>
  <div class="row">
    <div class="col-xs-12 col-md-3">
      <h2>
        Roles <br />
        <small class="text-muted">Add or modify role</small>
      </h2>
      <hr />
      <b-button variant="primary" :to="{ name: 'role-form', params: { id: '+' } }">
        <i class="fa fa-plus"></i> New role
      </b-button>
    </div>
    <div class="col-xs-12 col-md-9">
      <div class="row">
        <div class="col-xs-2 col-md-6">
          <select class="custom-select" v-model.number="roles.size" @change="findRoles(1, roles.size)">
            <option v-for="rs in roleSizeOptions" v-text="rs"></option>
          </select>
          <b-button @click="findRoles($route.query.page, $route.query.size)">
            <i class="fa fa-refresh"></i>
          </b-button>
        </div>
        <div class="col-xs-10 col-md-6">
          <b-input-group class="">
            <b-form-input placeholder="Keywords"></b-form-input>
            <b-input-group-button slot="right">
              <b-button variant="primary">
                <i class="fa fa-search"></i>
              </b-button>
            </b-input-group-button>
          </b-input-group>
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
          <b-button variant="danger" size="sm" @click="deleteRole(item.item)">
            <i class="fa fa-close"></i>
          </b-button>
        </template>
      </b-table>
      <div>
        <b-pagination size="md" :total-rows="roles.totalElements" :per-page="roles.size" v-model.number="roles.number" @input="findRoles(roles.number, roles.size)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    findRoles(page = 1, size = 20) {
      this.$router.push({ query: { page, size } });
      this.$store.dispatch('findRoles', { page, size });
    },
    deleteRole(role) {
    }
  },
  mounted() {
    if (!this.roles.content) {
      this.findRoles(this.$route.query.page, this.$route.query.size);
    }
  }
}
</script>
