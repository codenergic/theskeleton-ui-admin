<template>
  <div>
    <select class="custom-select" v-model="model" :value="value" @input="onInput($event.target.value)" @change="$emit('refresh')">
      <option v-for="s in sizes" v-text="s"></option>
    </select>
    <b-button @click="$emit('refresh')">
      <i class="fa fa-refresh"></i>
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 20
    },
    sizes: {
      type: Array,
      default: [5, 10, 20, 50, 100]
    }
  },
  data() {
    return {
      model: this.value
    }
  },
  methods: {
    onInput(value) {
      this.$emit('input', Number(value));
    }
  },
  watch: {
    value(v) {
      this.model = v;
    }
  }
}
</script>
