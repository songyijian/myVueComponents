<!--
 * @Description: Dialog 通用弹窗
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-05-27 10:08:20
-->
<template>
  <el-dialog v-bind="$attrs">
    <slot></slot>
  </el-dialog>
</template>
