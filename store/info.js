export const state = () => ({
  infos: null
})

export const mutations = {
  setInfos (state, infos) {
    state.infos = infos
  }
}

export const actions = {
  fetchInfos ({ commit }) {
    this.$axios.get('../manage/info').then(response => {
      commit('setInfos', response.data)
      return response.data
    })
  }
}
