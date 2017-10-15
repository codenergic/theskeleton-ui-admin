<template>
  <b-card>
    <h1 class="display-1 mb-3" v-text="$t('admin.base.title')"></h1>
    <div class="d-flex flex-wrap">
      <div class="p-1">
        <b-button variant="primary" size="lg" :to="{ name: 'admin-users' }">
          <i class="fa fa-user"></i>
          {{ $t('admin.user.title') }}
        </b-button>
      </div>
      <div class="p-1">
        <b-button variant="primary" size="lg" :to="{ name: 'admin-roles' }">
          <i class="fa fa-users"></i>
          {{ $t('admin.role.title') }}
        </b-button>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {

}
</script>
