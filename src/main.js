import Vue from "vue";
import App from "./App.vue";
import router from "@router/index.js";
import store from "./store/index";

// mock 数据
// import '@mock/index.js'
// 样式
import "@style/reset.scss";
import "@style/layout.scss";

Vue.config.productionTip = false;
Vue.config.devtools = true;

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
