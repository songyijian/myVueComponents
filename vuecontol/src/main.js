import Vue from 'vue'
import App from './App.vue'
import router from '~router/index.js'
import store from './store'
import axios from '~config/http.config.js'
import '~style/reset.scss'
import '~style/layout.scss'

Vue.config.productionTip = false

// http拓展到vue
Vue.prototype.$http = axios 
Vue.prototype.$post = axios.post
Vue.prototype.$get = function get(url, param) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      params: param,
      // cancelToken: new CancelToken(c => {
      //   cancel = c
      // })
    }).then(res => {
      resolve(res)
    })
  })
}

// mock 数据

import '~mock/index.js'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')