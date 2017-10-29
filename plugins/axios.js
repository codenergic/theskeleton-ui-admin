export default ({ app, store, redirect }) => {
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
