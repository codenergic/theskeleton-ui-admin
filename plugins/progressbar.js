import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: process.env.loadingColor,
  location: 'top',
  thickness: '2px'
})
