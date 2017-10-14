<template>
  <b-card>
    <h1 class="display-1 mb-3">
      The<strong>Skeleton</strong>
    </h1>
    <div class="d-flex flex-wrap">
      <div class="p-1">
        <b-button size="lg" variant="primary" :to="{ name: 'admin' }">
          <i class="fa fa-info"></i> Admin
        </b-button>
      </div>
      <div class="p-1">
        <b-button size="lg" variant="primary" :to="{ name: 'about' }">
          <i class="fa fa-info"></i> About
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
