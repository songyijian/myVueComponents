import Vue from "vue";
import App from "./App.vue";
import router from "@router/index.js";
import store from "./store";
// import axios from '@config/http.config.js'

// mock 数据
// import '@mock/index.js'
// 样式
import "@style/reset.scss";
import "@style/layout.scss";

Vue.config.productionTip = false;
Vue.config.devtools = true;

// // http拓展到vue
// Vue.prototype.$axios = axios

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
