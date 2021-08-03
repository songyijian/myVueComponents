/*
 * @Description:components 批量全局注册
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-07 16:03:43
<<<<<<< HEAD
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 11:45:35
 */

import ElinputGroup from './ElinputGroup/index';
import Popup from './Popup/index';

const componentsList = {
  ElinputGroup,
  Popup
};

function install(Vue, config) {
  Object.values(componentsList).forEach(item => {
=======
 * @LastEditors: yijian.song
 * @LastEditTime: 2021-07-31 00:36:55
 */

import ElinputGroup from "./ElinputGroup/index";
import Popup from "./Popup/index";

const componentsList = {
  ElinputGroup,
  Popup,
};

function install (Vue, config) {
  Object.values(componentsList).forEach((item) => {
>>>>>>> f97baecc98b417f4089c3bc541cf79ac1101da79
    item.install(Vue);
  });
}

export default {
<<<<<<< HEAD
  version: '0.1.0',
  install,
  ...componentsList
=======
  version: "0.1.0",
  install,
  ...componentsList,
>>>>>>> f97baecc98b417f4089c3bc541cf79ac1101da79
};
