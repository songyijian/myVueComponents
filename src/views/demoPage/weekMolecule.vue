<!--
 * @Description: WeekMolecule 周小时粒度管理控件
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-07 19:59:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-08 16:28:06
-->

<template>
  <div>
    <h2>WeekMolecule 周小时粒度管理控件</h2>

    <WeekMolecule :disabled="disabled"></WeekMolecule>
    <WeekMolecule v-model="val"></WeekMolecule>

    <button @click="allSelect">全选</button>

    {{ val }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: true,
      val: Array(24 * 7).fill(1)
    };
  },
  methods: {
    fn(value) {
      console.log(value);
    },
    allSelect() {
      let a = this.val[0] === 0 ? 1 : 0;
      this.val = this.val.map(item => a);
    }
  }
};
</script>

<style></style>
