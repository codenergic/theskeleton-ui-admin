<template>
  <form @submit.prevent="$emit('search', model)">
    <b-input-group>
      <b-form-input v-model="model" placeholder="Keywords" :input="value" class="my-0"></b-form-input>
      <b-input-group-append>
        <b-button variant="primary" class="my-0">
          <i class="fa fa-search"></i>
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </form>
</template>

<script>
export default {
  props: {
    value: { default: '' }
  },
  data () {
    return {
      model: this.value
    }
  },
  watch: {
    model (value) {
      this.$emit('input', value)
    },
    value (value) {
      this.model = value
    }
  }
}
</script>
