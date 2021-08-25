<!--
 * @Description  : ElinputGroup 多个el-input合并成一个input样式（el不支持多个select）
 * @Author       : yijian
 * @Version      : 1.0.0
 * @Date         : 2021-07-01 16:03:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 14:55:53
-->

<template>
  <div class="elinput-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ElinputGroup",
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
