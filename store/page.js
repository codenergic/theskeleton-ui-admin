export const state = () => ({
  paginationLimit: 20
})

export const mutations = {
  setPaginationLimit (state, limit) {
    state.paginationLimit = Number(limit) || 20
  }
}
