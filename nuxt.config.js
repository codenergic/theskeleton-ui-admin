const serverUrl = process.env.SERVER_URL || 'https://theskeleton.codenergic.org'

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

  env: {
    serverUrl
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  mode: 'spa',

  modules: [
    [ '@nuxtjs/axios', {
      baseURL: serverUrl + '/api',
      requestInterceptor: (config, { store }) => {
        return config
      }
    }],
    [ '@nuxtjs/bootstrap-vue', { css: false } ],
    [ '@nuxtjs/font-awesome' ]
  ],

  plugins: [
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/axios.js' }
  ],

  router: {
    linkActiveClass: 'active'
  },

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
  }
}
