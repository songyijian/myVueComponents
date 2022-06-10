<template>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" :width="width">
    <slot />
    <template #footer>
      <span class="dialog-footer">
        <el-button v-if="false" @click="handleClose">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineProps, ref, defineExpose } from "vue";
defineProps({
  dialogTitle: {
    type: String,
    default: "详情",
  },
  width: {
    ype: String,
    default: "30%",
  },
});
const dialogVisible = ref(false);

const show = () => {
  dialogVisible.value = true;
};
const close = () => {
  dialogVisible.value = false;
};
const handleClose = () => {
  dialogVisible.value = false;
};
// 原因：使用 <script setup> 语法糖的组件是默认关闭的，也即通过模板 ref 或者 $parent 链获取到的组件的公开实例，不会暴露任何在 <script setup> 中声明的绑定。
// 方法：为了在 <script setup> 语法糖组件中明确要暴露出去的属性，，使用 defineExpose 编译器宏将需要暴露出去的变量与方法放入暴露出去就可以
defineExpose({
  show,
  close,
  handleClose,
});
</script>
<style scoped lang="scss">
.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
