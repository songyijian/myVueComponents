<!--
 * @Description: WeekMolecule 周小时粒度管理控件
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-07 19:59:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-08 19:18:36
-->

<template>
  <div>
    <h2>WeekMolecule 周小时粒度管理控件</h2>

    <p><button @click="allSelect">全选</button></p>
    <WeekMolecule v-model="val"></WeekMolecule>
    <p>disabled</p>
    <WeekMolecule :disabled="disabled"></WeekMolecule>
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
