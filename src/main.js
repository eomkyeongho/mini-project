import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios';

loadFonts()

axios.interceptors.request.use(
  config => {
    config.baseURL = 'https://port-0-swm-mini-project-41-back-17xqnr2algrz2xh8.sel3.cloudtype.app'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const app = createApp(App)
app.use(vuetify).mount('#app')