<!--
 * @Description  : ElinputGroup 多个el-input合并成一个input样式（el不支持多个select）
 * @Author       : yijian
 * @Version      : 1.0.0
 * @Date         : 2021-07-01 16:03:30
<<<<<<< HEAD:src/componentsEl/ElinputGroup/src/main.vue
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 11:43:09
=======
 * @LastEditors: yijian.song
 * @LastEditTime: 2021-07-31 00:36:02
>>>>>>> f97baecc98b417f4089c3bc541cf79ac1101da79:src/componentsEl/ElinputGroup/ElinputGroup.vue
-->

<template>
  <div class="elinput-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
<<<<<<< HEAD:src/componentsEl/ElinputGroup/src/main.vue
  name: 'ElinputGroup'
=======
  name: "ElinputGroup",
>>>>>>> f97baecc98b417f4089c3bc541cf79ac1101da79:src/componentsEl/ElinputGroup/ElinputGroup.vue
};
</script>

<style lang="scss" scoped>
.elinput-group {
  display: inline-table;
  border-collapse: collapse;
  border-style: hidden;
  box-shadow: 0 0 0 1px #dcdfe6 inset;
  border-radius: 5px !important;

  /deep/.el-input__inner {
    border-width: 0px;
    background: none;
  }

  & > * {
    display: table-cell !important;
    border: 1px solid #dcdfe6;
  }
}
</style>
