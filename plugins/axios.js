export default ({ app, store }) => {
  app.$axios.interceptors.response.use(response => {
    // do nothing
    return response
  }, error => {
    // on error
    store.commit('loading/stop')
    window.$nuxt.error({ statusCode: error.response.status, message: error.message })
  })

  app.$axios.interceptors.request.use(config => {
    store.commit('loading/start')
    return config
  })

  app.$axios.interceptors.request.use(config => {
    config.headers.Authorization = store.getters['auth/getAuthorizationHeader']
    return config
  })

  // progress bar
  app.$axios.defaults.onDownloadProgress = (progressEvent) => {
    if (progressEvent.total === 0 || progressEvent.total === progressEvent.loaded) {
      store.commit('loading/stop')
    } else {
      var percentComplete = (progressEvent.loaded / progressEvent.total) * 100
      store.commit('loading/set', percentComplete)
    }
  }
}
