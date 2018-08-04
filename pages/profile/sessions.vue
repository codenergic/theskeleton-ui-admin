<template>
  <div>
    <b-card v-for="session in sessions" :key="session.sessionId" class="mb-2">
      <i class="fa fa-lock bg-primary p-3 font-2xl mr-3 float-left"></i>
      <h4 :class="['mb-1', session.expired ? 'text-muted' : 'text-primary']">
        {{ formatDate(session.lastRequest) }}
        <small>{{ formatTime(session.lastRequest) }}</small>
        <span v-if="!session.expired" class="badge badge-success ml-2" v-text="$t('common.active')"></span>
      </h4>
      <small v-text="session.sessionId.toUpperCase()" class="text-muted"></small>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

export default {
  computed: {
    ...mapState({
      sessions: state => state.profile.sessions
    })
  },
  methods: {
    formatDate (millis) {
      return moment(millis).format('DD-MM-YYYY')
    },
    formatTime (millis) {
      return moment(millis).format('HH:mm:ss')
    },
    ...mapActions({
      findSessions: 'profile/findCurrentUserSessions',
      revokeSession: 'profile/revokeSession'
    })
  },
  mounted () {
    this.findSessions()
  }
}
</script>
