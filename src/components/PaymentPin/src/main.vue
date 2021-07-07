<!--
 * @Description  : PaymentPin
 * @Author       : yijian
 * @Version      : 1.0.0
 * @Date         : 2021-07-02 17:30:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-07 11:33:23
-->
<template>
	<div class="input-wrap">
		<template v-if="passwordType === 'password'">
			<input
				type="password"
				autocomplete="new-password"
				onpaste="return false"
				v-for="item in codeArr"
				v-model="item.value"
				:index="item.idx"
				:key="item.idx"
				:ref="item.idx"
				@input="onInput($event, item, item.idx)"
				@keyup="onKeyup($event, item, item.idx)"
				maxlength="1"
				:disabled="item.disabled"
				:class="{ 'disabled-style': !item.disabled }"
			/>
		</template>
		<template v-else>
			<input
				type="txt"
				autocomplete="off"
				onpaste="return false"
				v-for="item in codeArr"
				v-model="item.value"
				:index="item.idx"
				:key="item.idx"
				:ref="item.idx"
				@input="onInput($event, item, item.idx)"
				@keyup="onKeyup($event, item, item.idx)"
				maxlength="1"
				:disabled="item.disabled"
				:class="{ 'disabled-style': !item.disabled }"
			/>
		</template>

		<span class="show-pwds" @click="showPwd">
			保密模式
		</span>
	</div>
</template>

<script>
const idx = 0;

function format(array = []) {
	return array.reduce((a, item) => a + item.value, "");
}

function deformat(str = "", len) {
	const strs = [...String(str)];
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push({ value: strs[i] || "", disabled: true, idx: idx + i });
	}

	const strLen = strs.length;
	const fin = strLen === 0 ? 0 : strLen === len ? strLen - 1 : strLen;

	console.log(fin);
	arr[fin].disabled = false;
	return arr;
}

export default {
	name: "PaymentPin",
	props: {
		value: {
			type: String,
			default: ""
		},
		length: {
			type: Number,
			default: 4
		},
		type: {
			type: String,
			validator(value) {
				return value === "number" || value === "txt";
			},
			default: "number"
		}
	},
	data() {
		const config = deformat(
			this.$props.value.replace(/\s/g, ""),
			this.$props.length
		);
		return {
			codeArr: config,
			passwordType: "password"
		};
	},
	mounted() {},
	methods: {
		typeValidate(agr) {
			const re = this.type === "number" ? /[0-9]/g : /[a-z]/g;
			return re.test(agr);
		},
		onInput(e, item, id) {
			const len = this.codeArr.length;
			const val = String(e.data)
				.replace(/\s/, "")
				.charAt(0);

			item.value = this.typeValidate(val) ? val : "";
			this.$emit("input", format(this.codeArr));
			if (item.value !== "") {
				if (id === len - 1) return;
				item.disabled = true;
				this.codeArr[`${id + 1}`].disabled = false;
				this.$nextTick(_ => {
					this.$refs[`${id + 1}`][0].focus();
				});
			}
		},
		onKeyup(e, item, id) {
			if (id === 0) return;
			if (e.keyCode === 8) {
				item.value = "";
				this.$emit("input", format(this.codeArr));
				item.disabled = true;
				this.codeArr[`${id - 1}`].disabled = false;
				this.$nextTick(_ => {
					this.$refs[`${id - 1}`][0].focus();
				});
			}
		},
		showPwd() {
			this.passwordType = this.passwordType === "password" ? "txt" : "password";
		}
	}
};
</script>

<style lang="scss" scoped>
.input-wrap {
	display: inline-block;
	input {
		background-color: #fff;
		text-align: center;
		box-sizing: border-box;
		&:focus {
			border: 1px solid #000;
			color: #000;
		}

		width: 40px;
		height: 40px;
		border: 1px solid #dcdfe6;
		border-radius: 4px;
		margin-left: 8px;
		border-color: #dcdfe6;
	}

	.disabled-style {
		border-color: #0dc693;
	}
}
</style>
