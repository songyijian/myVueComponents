/*
 * @Description:components 批量全局注册
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-07 16:03:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-07 19:48:46
 */

import PaymentPin from "./PaymentPin/index";
import WeekMolecule from "./WeekMolecule/index";

console.log(WeekMolecule);

const componentsList = [PaymentPin, WeekMolecule];

function install(Vue, config) {
	componentsList.forEach(item => item.install(Vue));
}

export default {
	version: "0.1.0",
	install,
	PaymentPin,
	WeekMolecule
};
