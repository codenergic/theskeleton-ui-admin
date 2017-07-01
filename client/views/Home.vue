<template>
  <div>
    <b-jumbotron header="The<strong>Skeleton</strong>">
      <br />
      <div>
        <b-button :to="{ name: 'admin' }" size="lg" variant="primary">
          <i class="fa fa-bolt"></i>
          Go to admin
        </b-button>
        <b-button :to="{ name: 'about' }" size="lg" variant="secondary">
          <i class="fa fa-info-circle"></i>
          About
        </b-button>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>
