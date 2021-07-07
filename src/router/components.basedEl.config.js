// var routes
const componentsBasedElment = {
	path: "/componentsBasedElment",
	name: "componentsBasedElment",
	redirect: "/componentsBasedElment/event",
	component: () => import("@views/Layout/demoLayout.vue"),
	children: [
		// {
		//   path: "/componentsBasedElment/event",
		//   name: "event",
		//   component: () => import("@views/componentsBasedElment/event.vue"),
		// },
	]
};
export default componentsBasedElment;
