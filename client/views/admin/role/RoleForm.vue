<template>
  <div class="row">
    <div class="col-xs-12 col-md-3">
      <h2>
        Roles <br />
      </h2>
      <p class="text-muted" v-if="!role.id">Add new role</p>
      <p class="text-muted" v-if="role.id">Modify role ({{ $route.params.id }})</p>
      <hr />
      <form>
        <div class="form-group">
          <b-button :to="{ name: 'role-list' }">
            <i class="fa fa-list"></i> View roles
          </b-button>
        </div>
      </form>
    </div>
    <div class="col-xs-12 col-md-9">
      <form method="post" @submit.prevent @submit="save(role)">
        <div class="form-group">
          <label for="code">Code</label>
          <b-form-input id="code" name="code" v-model="role.code"></b-form-input>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <b-form-input id="description" name="description" textarea :rows="3" v-model="role.description"></b-form-input>
        </div>
        <div>
          <b-button variant="primary">
            <i class="fa fa-floppy-o"></i> Save
          </b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    role() {
      return this.$store.state.role.role;
    }
  },
  methods: {
    save(role) {
      const router = this.$router;
      this.$store.dispatch('saveRole', role).then(() => {
        this.$store.dispatch('findRoles', { q: role.code }).then(() => {
          router.push({ name: 'role-list' });
        });
      });
    }
  },
  mounted() {
    if (this.$route.params.id === '+') {
      this.$store.commit('setRole', {});
    } else {
      this.$store.dispatch('findRoleByCode', this.$route.params.id);
    }
  }
}
</script>
