const appId = process.env.APP_ID || '0000015bb4a150850007bf0700000000'
const serverUrl = process.env.SERVER_URL || 'https://theskeleton.codenergic.org'
const loadingColor = process.env.LOADING_COLOR || '#20a8d8'
const cookieSession = require('cookie-session')

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
    appId,
    loadingColor,
    serverUrl
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: loadingColor, height: '1px' },

  ssr: false,

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

  serverMiddleware: [
    {
      handler: cookieSession({
        name: 'session',
        secret: 'Sup3rs3cr3tz'
      })
    },
    {
      path: '/app-login', handler: '~/middleware/auth-session-set'
    },
    {
      path: '/', handler: '~/middleware/auth-session-check'
    }
  ],

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
