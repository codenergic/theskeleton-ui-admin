<template>
  <main-layout>
    <module-title slot="menu" :title="$t('profile.picture.title')" :subtitle="$t('profile.picture.subtitle')">
    </module-title>
    <div slot="content" class="row">
      <div class="col-sm-12 col-md-8 col-lg-6">
        <b-card :img-src="currentUser.pictureUrl" img-alt="Image" img-top class="mb-2">
          <vue-core-image-upload class="btn btn-primary" :text="$t('profile.picture.labelUpload')" @imageuploading="imageChanged" resize="local" crop="local" crop-ratio="1:1" extensions="png,gif,jpeg,jpg" :is-xhr="false" :max-file-size="5242880" />
        </b-card>
      </div>
    </vue-core-image-upload>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from 'components/MainLayout';
import ModuleTitle from 'components/ModuleTitle';
import VueCoreImageUpload from 'vue-core-image-upload'

export default {
  components: {
    MainLayout,
    ModuleTitle,
    VueCoreImageUpload
  },
  data() {
    return {

    }
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser.loggedInUser;
    }
  },
  methods: {
    imageChanged(image) {
      const config = {
        headers: {
          'Content-Type': image.type
        }
      }
      this.axios.put('/api/profile/picture', image, config).then(data => {
        return data.data;
      }).then(data => this.$store.dispatch('findCurrentUser'));
    }
  }
}
</script>
