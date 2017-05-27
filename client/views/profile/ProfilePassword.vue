<template>
  <div>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-lg-3">
          <h2>Password</h2>
          <p class="text-muted">Update your password</p>
        </div>
        <div class="col-xs-12 col-md-8 col-lg-6">
          <form @submit.prevent>
            <div class="form-group">
              <label for="old-password">Old password</label>
              <b-form-input id="old-password" name="old-password" password></b-form-input>
            </div>
            <br />
            <div class="form-group">
              <label for="new-password">New Password</label>
              <b-form-input id="new-password" name="new-password" password></b-form-input>
            </div>
            <div class="form-group">
              <label for="confirm-new-password">Confirm New Password</label>
              <b-form-input id="confirm-new-password" name="confirm-new-password" password></b-form-input>
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
