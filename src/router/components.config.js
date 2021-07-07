// var routes

function loadDeom(path) {
	return view =>
		import(
			/* webpackChunkName: "demoPage-[request]" */ `@views/demoPage/${view}.vue`
		);
}

let components = {
	path: "/components",
	name: "components",
	redirect: "/components/install",
	component: () => import("@views/Layout/demoLayout.vue"),
	children: [
		{
			path: "/components/install",
			name: "安装",
			component: () => import("@views/demoPage/install.vue") //loadDeom("install")
		},
		{
			path: "/components/paymentPin",
			name: "paymentPin 支付验证",
			component: () => import("@views/demoPage/paymentPin.vue") //loadDeom("install")
		},
		{
			path: "/components/weekMolecule",
			name: "WeekMolecule 周小时粒度管理控件",
			component: () => import("@views/demoPage/weekMolecule.vue") //loadDeom("install")
		}
	]
};

export default components;
