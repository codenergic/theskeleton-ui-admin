<template>
  <div class="row">
    <div class="col-md-4">
      <social-connection-box
        :connected="Boolean(socials.facebook.profileUrl)"
        :connect-url="getConnectUrl('facebook')"
        :display-name="socials.facebook.displayName"
        :picture-url="socials.facebook.imageUrl"
        :profileUrl="socials.facebook.profileUrl"
        provider="Facebook"
        provider-id="facebook"
        provider-class="facebook"
        @disconnect="disconnectSocial('facebook')"
      />
    </div>
    <div class="col-md-4">
      <social-connection-box
        :connected="Boolean(socials.google.profileUrl)"
        :connect-url="getConnectUrl('google')"
        :display-name="socials.google.displayName"
        :picture-url="socials.google.imageUrl"
        :profileUrl="socials.google.profileUrl"
        provider="Google+"
        provider-id="google"
        provider-class="google-plus"
        @disconnect="disconnectSocial('google')"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SocialConnectionBox from '~/components/SocialConnectionBox'

export default {
  components: {
    SocialConnectionBox
  },
  computed: {
    currentUrl () {
      return window.location.href
    },
    ...mapState({
      socials: state => state.profile.socials
    })
  },
  methods: {
    disconnectSocial (provider) {
      this.disconnectCurrentConnectedSocial(provider).then(this.findCurrentConnectedSocials)
    },
    getConnectUrl (provider) {
      return `${process.env.serverUrl}/connect/${provider}`
    },
    onWindowFocus () {
      this.findCurrentConnectedSocials()
    },
    ...mapActions({
      disconnectCurrentConnectedSocial: 'profile/disconnectCurrentConnectedSocial',
      findCurrentConnectedSocials: 'profile/findCurrentConnectedSocials'
    })
  },
  mounted () {
    window.addEventListener('focus', this.onWindowFocus)
    this.onWindowFocus()
  },
  beforeDestroy () {
    window.removeEventListener('focus', this.onWindowFocus)
  }
}
</script>
