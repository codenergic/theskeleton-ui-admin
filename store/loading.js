export const state = () => ({
  loading: false,
  progress: 0
})

export const mutations = {
  set (state, progress) {
    state.loading = true
    state.progress = progress
  },
  start (state) {
    state.loading = true
  },
  stop (state) {
    state.loading = false
    state.progress = 0
  }
}
