/*
 * @Description:components 批量全局注册
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-07 16:03:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 11:39:51
 */

/**
 * 全局注册通用组件
 */
// const Components = {
//   install: function(Vue) {
//     const requireAll = context => context.keys().map(context);
//     const install = module => {
//       if (module.default.name) {
//         Vue.component(module.default.name, module.default);
//       }
//     };
//     /**
//      * @param 其组件目录的相对路径
//      * @param 是否查询其子目录
//      * @param 匹配基础组件文件名的正则表达式
//      */
//     requireAll(require.context('./search-section', true, /\.vue$/)).forEach(install);
//   }
// };

// export default Components;

// const requireAll = context => context.keys().map(context);
// requireAll(require.context('./', true, /index\.js$/)).forEach(item => {
//   item.default && console.log(item);
// });

// console.log(require.context('./', true, /index\.js$/).keys());

// require.context('./', true, /index\.js$/);
// .keys()
// .forEach();
let a = require.context('./', true, /index\.js$/);
console.log(a, a.keys());

import PaymentPin from './PaymentPin/index';
import WeekMolecule from './WeekMolecule/index';
import DecayLodingBar from './DecayLodingBar/index';

const componentsList = {
  PaymentPin,
  WeekMolecule,
  DecayLodingBar
};

function install(Vue, config) {
  Object.values(componentsList).forEach(item => {
    item.install(Vue);
  });
}

export default {
  version: '0.1.0',
  install,
  ...componentsList
};
