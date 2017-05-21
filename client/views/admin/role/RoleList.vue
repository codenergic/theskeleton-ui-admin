<template>
  <div class="row">
    <div class="col-xs-12 col-md-3">
      <h2>
        Roles <br />
        <small class="text-muted">Add or modify role</small>
      </h2>
      <hr />
      <form>
        <div class="form-group">
          <b-form-input placeholder="Keywords"></b-form-input>
        </div>
        <div class="form-group">
          <b-button>
            <i class="fa fa-search"></i> Search
          </b-button>
        </div>
      </form>
    </div>
    <div class="col-xs-12 col-md-9">
      <div>
        <b-button variant="primary" class="pull-right">
          <i class="fa fa-plus"></i> New role
        </b-button>
        <select class="custom-select" v-model.number="roles.size" @change="fetchRoles(1, roles.size)">
          <option v-for="rs in roleSizeOptions" v-text="rs"></option>
        </select>
      </div>
      <br />
      <b-table hover responsive :items="roles.content" :fields="fields" :per-page="roles.size">
      </b-table>
      <div>
        <b-pagination size="md" :total-rows="roles.totalElements" :per-page="roles.size" v-model.number="roles.number" @input="fetchRoles(roles.number, roles.size)" />
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
        itemNumber: {
          label: '#'
        },
        code: {
          label: 'Code'
        },
        description: {
          label: 'Description'
        }
      }
    }
  },
  computed: {
    roles() {
      return this.$store.state.role.roles;
    }
  },
  methods: {
    fetchRoles(page = 1, size = 20) {
      this.$router.push({ query: { page, size } });
      this.$store.dispatch('fetchRoles', { page, size });
    }
  },
  mounted() {
    this.fetchRoles(this.$route.query.page, this.$route.query.size);
  }
}
</script>
