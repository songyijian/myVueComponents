/*
 * @Description  : Popup全局注册入口
 * @Author       : yijian
 * @Version      : 3.0.0
 * @Date         : 2021-06-28 15:04:32
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2021-06-28 15:19:23
 */

import PopupVUE from "./Popup.vue";

const Popup = {
  install: function(Vue) {
    Vue.component("Popup", PopupVUE);
  }
};

export default Popup;
