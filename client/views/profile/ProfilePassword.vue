<template>
  <main-layout>
    <module-title slot="menu" :title="$t('profile.password.title')" :subtitle="$t('profile.password.subtitle')">
    </module-title>
    <div slot="content" class="row">
      <form class="col-xs-12 col-lg-8" @submit.prevent>
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
  </main-layout>
</template>

<script>
import MainLayout from 'components/MainLayout';
import ModuleTitle from 'components/ModuleTitle';

export default {
  components: {
    MainLayout,
    ModuleTitle
  }
}
</script>
