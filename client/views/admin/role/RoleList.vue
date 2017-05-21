<template>
  <div class="row">
    <div class="col-xs-12 col-md-3">
    </div>
    <div class="col-xs-12 col-md-9">
      <b-table striped hover condensed :items="roles.content" :fields="fields" :per-page="roles.size">
      </b-table>
      <div>
        <b-pagination size="md" :total-rows="roles.totalElements" :per-page="roles.size" v-model="roles.number" v-on:input="fetchRoles" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: {
        no: {
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
    fetchRoles(page) {
      this.$router.push({ query: { page } });
      this.$store.dispatch('fetchRoles', page);
    }
  },
  mounted() {
    this.fetchRoles(this.$route.query.page || 1);
  }
}
</script>
