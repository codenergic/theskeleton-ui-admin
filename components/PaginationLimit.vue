<template>
  <div>
    <b-input-group>
      <select v-model="model" class="custom-select my-0" :value="value" @input="onInput($event.target.value)" @change="$emit('refresh')">
        <option v-for="s in sizes" :key="s" v-text="s"></option>
      </select>
      <b-input-group-append>
        <b-button variant="secondary" class="my-0" @click="$emit('refresh')">
          <i class="fa fa-refresh"></i>
        </b-button>
      </b-input-group-append>
    </b-input-group>
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
      default: () => [ 5, 10, 20, 50, 100 ]
    }
  },
  data () {
    return {
      model: this.value
    }
  },
  methods: {
    onInput (value) {
      this.$emit('input', Number(value))
    }
  },
  watch: {
    value (v) {
      this.model = v
    }
  }
}
</script>
