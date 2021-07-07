<!--
 * @Description: paymentPin 支付验证
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-06 16:52:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-07 20:02:50
-->
<template>
	<div>
		<h2>paymentPin 支付验证</h2>
		<PaymentPin v-model="val" @input="oninput" />
		<p>{{ val }}</p>
	</div>
</template>

<script>
export default {
	name: "PaymentPinDEMO",
	data() {
		return {
			val: "123"
		};
	},

	methods: {
		oninput() {
			console.log(this.val);
		}
	}
};
</script>

<style></style>
