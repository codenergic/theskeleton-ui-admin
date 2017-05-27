<template>
  <div>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-lg-3">
          <h2>Basic Profile</h2>
          <p class="text-muted">Update your basic profile</p>
        </div>
        <div class="col-xs-12 col-md-8 col-lg-6">
          <form @submit.prevent>
            <div class="form-group">
              <label for="username">Username</label>
              <b-form-input id="username" name="username"></b-form-input>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <b-form-input id="email" name="email" type="email"></b-form-input>
            </div>
            <div>
              <b-button variant="primary">
                <i class="fa fa-floppy-o"></i> Update
              </b-button>
            </div>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
</script>
