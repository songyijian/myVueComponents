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
	name: "componentLayout",
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

	.menu-list {
		// background: #ccc;
		border-right: 1px solid #ccc;
		width: 240px;
		a {
			display: block;
		}
	}
}
// .learn {
// 	display: flex;
// 	flex-direction: row;
// 	.list {
// 		width: 15rem;
// 		a {
// 			display: block;
// 			line-height: 2rem;
// 			background-color: #ccc;
// 			margin: 2px 0;
// 		}
// 	}
// 	.content {
// 		flex: auto;
// 		padding: 1rem 0 1rem 1rem;
// 	}
// }
</style>
