export default ({ app, store, route, redirect }) => {
  store.lastState = JSON.stringify({
    r: route.name, // route name
    q: route.query, // url query
    p: route.params // url params
  })
  app.$axios.interceptors.response.use(response => {
    store.responseHttpStatus = response.status
    // store.commit('auth/responseHttpStatus', response.status)
    return response
  }, error => {
    store.commit('loading/stop')
    store.responseHttpStatus = error.response.status
    // store.commit('auth/responseHttpStatus', error.response.status)
    if (store.state.auth.session !== null) {
      redirect('/error')
    }
  })

  app.$axios.interceptors.request.use(config => {
    store.commit('loading/start')
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
