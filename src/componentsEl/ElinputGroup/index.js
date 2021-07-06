/*
 * @Description  : ElinputGroup 多个el-input合并成一个input样式（el不支持多个select）
 * @Author       : yijian
 * @Version      : 1.0.0
 * @Date         : 2021-07-01 16:03:09
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2021-07-01 16:21:40
 */

import ElinputGroupVUE from "./ElinputGroup.vue";

const ElinputGroup = {
  install: function(Vue) {
    Vue.component("ElinputGroup", ElinputGroupVUE);
  }
};

export default ElinputGroup;
