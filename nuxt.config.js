const proxy = require('http-proxy-middleware')
const proxyTarget = 'http://localhost:8080'
const proxyHandler = proxy({ target: proxyTarget })

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'TheSkeleton Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'TheSkeleton Admin' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '~/assets/css/style.scss'
  ],

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  mode: 'spa',

  modules: [
    [ '@nuxtjs/axios', {
      baseURL: '/api',
      requestInterceptor: (config, { store }) => {
        return config
      }
    }],
    [ '@nuxtjs/bootstrap-vue', { css: false } ],
    [ '@nuxtjs/font-awesome' ]
  ],

  plugins: [
    { src: '~/plugins/i18n.js' }
  ],

  router: {
    linkActiveClass: 'active'
  },

  serverMiddleware: [
    { path: '/api', handler: proxyHandler },
    { path: '/auth', handler: proxyHandler },
    { path: '/login', handler: proxyHandler },
    { path: '/manage', handler: proxyHandler },
    { path: '/oauth', handler: proxyHandler },
    { path: '/webjars', handler: proxyHandler }
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extractCSS: true
    // vendor: [
    //   '@nuxtjs/axios',
    //   '@nuxtjs/bootstrap-vue',
    //   '@nuxtjs/font-awesome'
    // ]
  }
}
