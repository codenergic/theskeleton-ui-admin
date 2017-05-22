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
          <b-button :to="{ name: 'role-list' }">
            <i class="fa fa-list"></i> View roles
          </b-button>
        </div>
      </form>
    </div>
    <div class="col-xs-12 col-md-9">
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
  }
}
</script>
