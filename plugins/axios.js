export default ({ app, store, route, redirect }) => {
  store.lastState = JSON.stringify({
    r: route.name, // route name
    q: route.query, // url query
    p: route.params // url params
  })
  app.$axios.interceptors.response.use(response => {
    store.responseHttpStatus = response.status
    return response
  }, error => {
    store.responseHttpStatus = error.response.status
    if (store.state.auth.session !== null) {
      redirect('/error')
    }
  })
}
