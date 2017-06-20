<template>
  <div>
    <b-jumbotron header="The<strong>Skeleton</strong>">
      <br />
      <div>
        <b-button :to="{ name: 'admin' }" size="lg" variant="primary">
          <i class="fa fa-bolt"></i>
          Go to admin
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
