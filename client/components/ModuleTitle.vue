<template>
  <div>
    <h2 v-text="title"></h2>
    <p class="text-muted" v-text="subtitle"></p>
    <hr />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: [ 'title', 'subtitle' ]
}
</script>
