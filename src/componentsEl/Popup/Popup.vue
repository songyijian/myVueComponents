<!--
 * @Description  : Popup纯粹的弹窗组件，继承了系统订制ui样式
 * @Author       : yijian
 * @Version      : 0.1.0
 * @Date         : 2021-06-28 14:55:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-01 16:26:57
-->

<template>
  <el-dialog
    :visible.sync="visible"
    custom-class="add-money-dialog"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  props: {
    name: "Popup",
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const visible = this.$props.show;
    return {
      visible: visible,
    };
  },
  watch: {
    show(_new) {
      this.visible = _new;
    },
    visible(_new, old) {
      this.$emit("update:show", _new);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.add-money-dialog .el-dialog__header {
  display: none !important;
}

/deep/.add-money-dialog .el-dialog__body {
  margin: 0;
  padding: 0 !important;
}

/deep/.add-money-dialog {
  width: 435px;
  border-top: 10px solid #1dce9f;
  border-radius: 8px;
}
</style>
