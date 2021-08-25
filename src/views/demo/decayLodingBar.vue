<!--
 * @Description: WeekMolecule 周小时粒度管理控件
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-07 19:59:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-16 15:48:53
-->

<template>
  <div>
    <h2>DecayLodingBar 衰减加载条</h2>
    <p>（拼多多耍猴玩法）,先快后慢自身永远加载不完，:end=true后完成加载</p>
    <br>
    <DecayLodingBar :end="end" ref="dlb" />
    <br>
    <button @click="toEnd"> 完成加载 </button> {{end}}
    <button @click="toInit"> 重载 </button>
  </div>
</template>

<script>
export default {
	name: "DecayLodingBarDEMO",
  data() {
    return {
      end: false,
    };
  },
  methods: {
    toEnd(){
      this.end = true
    },
    toInit(){
      this.end = false
      let a = this.$refs.dlb
      a.reset()
    }
  }
};
</script>

<style></style>
