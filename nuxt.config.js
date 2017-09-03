module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'theskeleton-ui-admin',
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

  modules: [
    [ '@nuxtjs/axios', { baseURL: '/api' } ],
    [ '@nuxtjs/bootstrap-vue', { css: false } ],
    '@nuxtjs/font-awesome'
  ],

  router: {
    base: '/admin',
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
    extractCSS: true,
    vendor: [
      'axios',
      'bootstrap',
      '@nuxtjs/axios',
      '@nuxtjs/bootstrap-vue',
      '@nuxtjs/font-awesome'
    ]
  }
}
