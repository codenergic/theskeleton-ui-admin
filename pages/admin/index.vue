<template>
  <b-card>
    <h1 class="display-3 mb-3" v-text="$t('admin.base.title')"></h1>
    <div class="d-flex flex-wrap">
      <b-button variant="primary" size="lg" :to="{ name: 'admin-users' }">
        <i class="fa fa-user"></i>
        {{ $t('admin.user.title') }}
      </b-button>
    </div>
  </b-card>
</template>

<script>
export default {

}
</script>
