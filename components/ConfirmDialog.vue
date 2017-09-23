<template>
  <b-modal :title="title" :id="id" @ok="$emit('dialog-confirm')" @cancel="$emit('dialog-cancel')">
    <slot></slot>
  </b-modal>
</template>

<script>
export default {
  props: [ 'id', 'title' ]
}
</script>
