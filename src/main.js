import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from './store/index'

import '@/style/reset.scss'
import '@/style/layout.scss'

// mock 数据
// import '@mock/index.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import mycomponents from '@/components/index'
Vue.use(mycomponents)

// import PaymentPin from "@/components/PaymentPin";
// Vue.use(PaymentPin);
// console.log(PaymentPin);

Vue.config.productionTip = false
Vue.config.devtools = true
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
