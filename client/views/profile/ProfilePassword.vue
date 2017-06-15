<template>
  <div>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-lg-3">
          <module-title :title="$t('profile.password.title')" :subtitle="$t('profile.password.subtitle')">
          </module-title>
        </div>
        <div class="col-xs-12 col-md-8 col-lg-6">
          <form @submit.prevent>
            <div class="form-group">
              <label for="old-password" v-text="$t('profile.password.labelPasswordOld')"></label>
              <b-form-input id="old-password" name="old-password" type="password"></b-form-input>
            </div>
            <br />
            <div class="form-group">
              <label for="new-password" v-text="$t('profile.password.labelPasswordNew')"></label>
              <b-form-input id="new-password" name="new-password" type="password"></b-form-input>
            </div>
            <div class="form-group">
              <label for="confirm-new-password" v-text="$t('profile.password.labelPasswordConfirm')"></label>
              <b-form-input id="confirm-new-password" name="confirm-new-password" type="password"></b-form-input>
            </div>
            <div>
              <b-button variant="primary">
                <i class="fa fa-floppy-o"></i> {{ $t('common.update', []) }}
              </b-button>
            </div>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import ModuleTitle from 'components/ModuleTitle';

export default {
  components: {
    ModuleTitle
  }
}
</script>
