<template>
  <div>
    <b-jumbotron header="403 - Access Denied" class="text-center">
      <br />
      <div>
        <b-button :to="{ name: 'home' }" size="lg" variant="primary">
          <i class="fa fa-bolt"></i>
          Go home
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
