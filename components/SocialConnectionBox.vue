<template>
  <b-card>
    <div slot="header">
      <b-button v-if="connected" variant="danger" class="m-0 pull-right" @click="$emit('disconnect')" v-text="$t('common.disconnect')"></b-button>
      <h3 class="m-0">
        <i :class="`fa fa-${providerId}`"></i>
      </h3>
    </div>
    <b-button v-if="!connected" :variant="providerClass" :href="connectUrl" target="_blank">
      <span v-text="provider"></span>
    </b-button>
    <div v-if="connected">
      <img :src="pictureUrl" style="width: 5em;" class="mr-3" />
      <b-button :variant="providerClass" :href="profileUrl" target="_blank">
        <span v-text="displayName"></span>
      </b-button>
    </div>
  </b-card>
</template>

<script>
export default {
  props: {
    connected: {
      type: Boolean,
      default: () => false
    },
    connectUrl: {
      type: String,
      default: () => ''
    },
    displayName: {
      type: String,
      default: () => ''
    },
    profileUrl: {
      type: String,
      default: () => ''
    },
    pictureUrl: {
      type: String,
      default: () => ''
    },
    provider: {
      type: String,
      default: () => ''
    },
    providerId: {
      type: String,
      default: () => ''
    },
    providerClass: {
      type: String,
      default: () => ''
    }
  }
}
</script>
