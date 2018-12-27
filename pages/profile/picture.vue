<template>
  <b-card>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <img v-if="!pictureUrl" :src="currentUser.pictureUrl" class="mb-1" />
        <b-form-file v-model="picture" accept="image/*" :capture="true" class="mb-3"></b-form-file>
        <div class="my-1">
          <b-button v-if="pictureUrl" variant="secondary" @click="cancelCrop">
            <i class="fa fa-ban"></i>
            Cancel
          </b-button>
          <b-button v-if="pictureUrl" variant="primary" class="ml-1" @click="cropAndUpload">
            <i class="fa fa-check"></i>
            Ok
          </b-button>
        </div>
        <cropper v-if="pictureUrl"
        ref="cropper"
        :src="pictureUrl"
        :aspect-ratio="1"
        :auto-crop-area="1"
        :crop-box-movable="false"
        :drag-mode="'move'"
        :min-canvas-width="400"
        :min-canvas-height="400"
        :min-container-width="400"
        :min-container-height="400"
/>
      </div>
    </div>
  </b-card>
</template>

<script>
import Cropper from 'vue-cropperjs'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Cropper
  },
  data () {
    return {
      picture: null,
      pictureUrl: null
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.auth.loggedInUser
    })
  },
  methods: {
    cancelCrop () {
      this.$refs.cropper.destroy()
      this.picture = null
      this.pictureUrl = null
    },
    cropAndUpload () {
      this.$refs.cropper.getCroppedCanvas({
        width: 400,
        height: 400
      }).toBlob(blob => {
        this.$axios.put('/users/me/picture', blob, { headers: { 'Content-Type': 'image/jpg' } })
          .then(() => this.findCurrentUser())
          .then(() => this.cancelCrop())
      }, 'image/jpg', 1)
    },
    ...mapActions({
      findCurrentUser: 'auth/findCurrentUser'
    })
  },
  watch: {
    picture (pic) {
      if (!pic) return
      var reader = new FileReader()
      reader.onload = e => {
        this.pictureUrl = e.target.result
        if (this.$refs.cropper) {
          this.$refs.cropper.replace(e.target.result)
        }
      }
      reader.readAsDataURL(pic)
    }
  }
}
</script>
