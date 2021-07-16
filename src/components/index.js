/*
 * @Description:components 批量全局注册
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-07 16:03:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-16 15:01:16
 */

import PaymentPin from "./PaymentPin/index";
import WeekMolecule from "./WeekMolecule/index";
import DecayLodingBar from "./DecayLodingBar/index";

const componentsList = {
	PaymentPin,
	WeekMolecule,
	DecayLodingBar
}

function install(Vue, config) {
	Object.values(componentsList).forEach(item=>{
		item.install(Vue)
	})
}

export default {
	version: "0.1.0",
	install,
	...componentsList
};
