<template>
  <main-layout>
    <module-title slot="menu" :title="$t('profile.picture.title')" :subtitle="$t('profile.picture.subtitle')">
    </module-title>
    <div slot="content" class="row">
      <div class="col-sm-12 col-md-8 col-lg-6">
        <b-card :img-src="currentUser.pictureUrl" img-top class="mb-2">
          <cropper :height="300" :width="300" lang-type="en" @crop-success="imageChanged" @close="imageChanged" :no-circle="true" v-model="showCropper"></cropper>
          <b-button variant="primary" @click="toggleShowCropper">
            <i class="fa fa-upload"></i>
            {{ $t('profile.picture.labelUpload') }}
          </b-button>
          <!-- <vue-core-image-upload class="btn btn-primary" :text="$t('profile.picture.labelUpload')" @imageuploading="imageChanged" resize="local" crop="local" crop-ratio="1:1" extensions="png,gif,jpeg,jpg" :is-xhr="false" :max-file-size="5242880"></vue-core-image-upload> -->
        </b-card>
      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from 'components/MainLayout';
import ModuleTitle from 'components/ModuleTitle';
import Cropper from 'vue-image-crop-upload';

export default {
  components: {
    MainLayout,
    ModuleTitle,
    Cropper
  },
  data() {
    return {
      showCropper: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser.loggedInUser;
    }
  },
  methods: {
    toggleShowCropper() {
      const showCropper = this.showCropper;
      this.showCropper = !showCropper;
      // this.showCropper = !this.showCropper;
    },
    imageChanged(image, field) {
      fetch(image)
        .then(res => res.arrayBuffer())
        .then(buf => new File([buf], field, { type: 'image/jpg' }))
        .then(file => ({ file, config: { headers: { 'Content-Type': 'image/jpg' } } }))
        .then(({ file, config }) => {
          return this.axios.put('/api/profile/picture', file, config);
        }).then(() => this.$store.dispatch('findCurrentUser'));

      // const config = {
      //   headers: {
      //     'Content-Type': image.type
      //   }
      // }
    }
  }
}
</script>
