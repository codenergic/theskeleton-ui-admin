<template>
  <b-card>
    <h1 class="display-1 mb-3">
      The<strong>Skeleton</strong>
    </h1>
    <div class="d-flex flex-wrap">
      <div class="p-1">
        <b-button size="lg" variant="primary" :to="{ name: 'profile' }">
          <i class="fa fa-user"></i>
          {{ $t('main.route.profile') }}
        </b-button>
      </div>
      <div class="p-1">
        <b-button size="lg" variant="primary" :to="{ name: 'admin' }">
          <i class="fa fa-laptop"></i>
          {{ $t('main.route.admin') }}
        </b-button>
      </div>
      <div class="p-1">
        <b-button size="lg" variant="primary" :to="{ name: 'about' }">
          <i class="fa fa-info"></i>
          {{ $t('main.route.about') }}
        </b-button>
      </div>
      <div class="p-1">
        <b-button size="lg" variant="primary" href="https://github.com/codenergic/theskeleton" target="_blank">
          <i class="fa fa-github"></i> GitHub
        </b-button>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
}
</script>
