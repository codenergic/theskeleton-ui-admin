const serverUrl = process.env.SERVER_URL || 'https://theskeleton.codenergic.org'
const loadingColor = process.env.LOADING_COLOR || '#20a8d8'

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'TheSkeleton',
    titleTemplate: '%s - TheSkeleton Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'TheSkeleton Admin' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: ['~/assets/css/style.scss'],

  env: {
    loadingColor,
    serverUrl
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: loadingColor, height: '1px' },

  mode: 'spa',

  modules: [
    [
      '@nuxtjs/axios',
      {
        baseURL: serverUrl + '/api'
      }
    ],
    ['@nuxtjs/bootstrap-vue', { css: false }],
    ['@nuxtjs/font-awesome']
  ],

  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/progressbar.js' },
    { src: '~/plugins/title.js' },
    { src: '~/plugins/websocket.js' }
  ],

  router: {
    linkActiveClass: 'active'
  },

  /*
   ** Build configuration
   */
  build: {
    publicPath: process.env.PUBLIC_PATH || '/_/',
    /*
     ** Run ESLint on save
     */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
