<template lang="html">
	<div class="layout-components">
		<div class="menu-list">
			<router-link v-for="item in componentsConfig" :to="item.path">
				{{ item.name }}
			</router-link>
		</div>
		<router-view />
	</div>
</template>

<script>
import routes from "@router/components.config.js";
export default {
	name: "demoLayout",
	data() {
		return {
			componentsConfig: routes.children
		};
	},
	mounted() {}
};
</script>

<style scoped lang="scss">
.layout-components {
	display: flex;
	flex-flow: row;
	padding: 2rem 0;

	.menu-list {
		// background: #ccc;
		border-right: 1px solid #ccc;
		width: 240px;
		a {
			display: block;
		}
	}
}
</style>
