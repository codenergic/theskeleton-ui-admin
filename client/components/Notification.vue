<template>
  <div class="float-right">
    <b-alert :variant="variant" :show="countdown" @dismiss-count-down="countdownChanged" dismissible>{{ text }}</b-alert>
  </div>
</template>

<script>
export default {
  props: [ 'variant', 'text', 'countdown' ],
  methods: {
    countdownChanged(dismissCountdown) {
      this.$emit('countdownChanged', dismissCountdown);
    }
  }
}
</script>
