/*
 * @Description: 全局注册入口
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-07 15:55:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 14:55:59
 */

import component from "./src/main.vue";

const inlet = {
  install: function (Vue) {
    Vue.component(component.name, component);
  },
};

export default inlet;
