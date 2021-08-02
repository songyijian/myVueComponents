/*
 * @Description  : 全局注册入口
 * @Author       : yijian
 * @Version      : 3.0.0
 * @Date         : 2021-06-28 15:04:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 11:42:54
 */

import component from './src/main.vue';

const inlet = {
  install: function(Vue) {
    Vue.component(component.name, component);
  }
};

export default inlet;
