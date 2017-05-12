<template>
  <div class="counter-wrapper">
    <div class="counter">
      {{ count }}
    </div>
    <div>
      {{ infos }}
    </div>
    <button @click="$store.commit('INCREMENT')">Increment</button>
    <button @click="$store.commit('DECREMENT')">Decrement</button>
    <button @click="$store.dispatch('incrementAsync')">Increment Async</button>
    <button @click="$store.dispatch('getInfos')">Get Infos</button>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    },
    infos() {
      return this.$store.state.infos
    }
  }
}
</script>

<style>
/*.counter {
  margin: 100px auto;
  border-radius: 3px;
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 5rem;
  background-color: #f0f0f0;
  user-select: none;
}*/
</style>
