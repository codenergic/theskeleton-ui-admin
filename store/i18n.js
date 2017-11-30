export const state = () => ({
  lang: 'en',
  langs: [ 'en', 'id' ]
})

export const mutations = {
  setLang (state, lang) {
    state.lang = lang
  }
}

export const actions = {
  getLang ({ state }) {
    return window.localStorage.getItem('lang') || state.lang
  },
  setLang ({ commit }, lang) {
    window.localStorage.setItem('lang', lang)
    commit('setLang', lang)
    this.app.i18n.locale = lang
  }
}
