<template>
  <form @submit.prevent="$emit('search', model)">
    <b-input-group>
      <b-form-input placeholder="Keywords" v-model="model" :input="value"></b-form-input>
      <b-input-group-button slot="right">
        <b-button variant="primary">
          <i class="fa fa-search"></i>
        </b-button>
      </b-input-group-button>
    </b-input-group>
  </form>
</template>

<script>
export default {
  props: {
    value: { default: this.model }
  },
  data() {
    return {
      model: this.value
    }
  },
  watch: {
    model(value) {
      this.$emit('input', value);
    },
    value(value) {
      this.model = value;
    }
  }
}
</script>
