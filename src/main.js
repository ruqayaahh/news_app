import Vue from 'vue'
import axios from 'axios'

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

axios.create ({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    Authorization: '660b6336f9f0457c92fa713f12496141'
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
