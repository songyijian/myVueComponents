/*
<<<<<<< HEAD
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
=======
 * @Description: 全局注册入口
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-07 15:55:32
 * @LastEditors: yijian.song
 * @LastEditTime: 2021-07-31 00:35:48
 */

import component from "./src/main.vue";

const inlet = {
  install: function (Vue) {
    Vue.component(component.name, component);
  },
>>>>>>> f97baecc98b417f4089c3bc541cf79ac1101da79
};

export default inlet;
