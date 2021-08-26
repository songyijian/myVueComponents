<!--
 * @Description: 表单输入类demo
 * @Author: yijian
 * @Version: 2021.7.30
 * @Date: 2021-08-25 16:34:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-26 19:07:24
-->
<template>
  <div>
    <h2>CarryInput 进位数字输入框</h2>
    <CarryInput class="numinput" v-model="c1" :disabled="disabled" :precision="precision">
      <span class="icons">$</span>
    </CarryInput>
    <ul>
      <li>v-model 支持 {{ c1 }}</li>
      <li>disabled 禁用 {{ disabled }}</li>
      <li>precision 小数限制 {{ precision }}</li>
      <li>slot 配置icon $</li>
    </ul>
    <button @click="disabled = !disabled">disabled</button>

    <h2>paymentPin 支付验证</h2>
    <!-- <PaymentPin v-model="pin_val" @input="oninput" /> -->
    <ul>
      <li>v-model 支持 {{ pin_val }}</li>
      <li>disabled 禁用 {{ disabled }}</li>
      <li>precision 小数限制 {{ precision }}</li>
    </ul>
    <!-- <p>{{ val }}</p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      c1: '2',
      disabled: false,
      precision: 3,
      pin_val: '123'
    }
  },
  mounted() {
    console.log(process.env.NODE_ENV)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.icons {
  color: red;
  font-size: 20px;
}
</style>
