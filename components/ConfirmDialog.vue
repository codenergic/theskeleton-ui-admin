<template>
  <b-modal :id="id" :title="title" @ok="$emit('dialog-confirm')" @cancel="$emit('dialog-cancel')">
    <slot></slot>
  </b-modal>
</template>

<script>
export default {
  props: [ 'id', 'title' ]
}
</script>
