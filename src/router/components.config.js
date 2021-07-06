// var routes

function loadDeom(path) {
	return view =>
		import(
			/* webpackChunkName: "componentDEMO-[request]" */ `@views/componentDEMO/${view}.vue`
		);
}

let components = {
	path: "/components",
	name: "components",
	redirect: "/components/install",
	component: () => import("@views/Layout/componentLayout.vue"),
	children: [
		{
			path: "/components/install",
			name: "安装",
			component: () => import("@views/componentDEMO/install.vue") //loadDeom("install")
		},
		{
			path: "/components/paymentPin",
			name: "paymentPin 支付验证",
			component: () => import("@views/componentDEMO/paymentPin.vue") //loadDeom("install")
		}
	]
};

export default components;
