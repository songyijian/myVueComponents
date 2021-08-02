/*
 * @Description:components 批量全局注册
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-07 16:03:43
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
    item.install(Vue);
  });
}

export default {
  version: '0.1.0',
  install,
  ...componentsList
};
