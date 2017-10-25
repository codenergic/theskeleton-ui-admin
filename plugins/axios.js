export default ({ app, store, redirect }) => {
  app.$axios.interceptors.response.use(response => {
    store.responseHttpStatus = response.status
    return response
  }, error => {
    store.responseHttpStatus = error.response.status
    redirect('/error')
  })
}
