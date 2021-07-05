import Vue from "vue";
import App from "./App.vue";
import router from "@router/index.js";
<<<<<<< HEAD
import store from "./store";
import axios from '@utils/axios.js'
=======
import store from "./store/index";
>>>>>>> 2e2795914a1989b4085a3c7695a0a2479688f278

import "@style/reset.scss";
import "@style/layout.scss";

// mock 数据
// import '@mock/index.js'

Vue.config.productionTip = false;
Vue.config.devtools = true;
<<<<<<< HEAD
Vue.prototype.$axios = axios
=======
>>>>>>> 2e2795914a1989b4085a3c7695a0a2479688f278

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");