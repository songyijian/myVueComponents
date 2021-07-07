import Vue from "vue";
import Router from "vue-router";

import base from "./router.config";
import componentsBasedEl from "./components.basedEl.config";
import components from "./components.config";

Vue.use(Router);

export default new Router({
	// routes
	routes: [base, componentsBasedEl, components]
});
