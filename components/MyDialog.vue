<!--
 * @Description: 自定义 Dialog 通用弹窗
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-06-07 17:35:13
-->
<template>
  <teleport to="body" :disabled="data.teleport">
    <div class="dialog-bg" v-if="modal"></div>
    <div :class="{ dialog: true }">
      <header class="dialog-header">
        <h1>{{ title }}</h1>
        <span class="close">
          <el-icon><CloseBold /></el-icon>
        </span>
      </header>

      <div class="dialog-content">
        <slot></slot>
      </div>

      <footer class="dialog-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </teleport>
</template>
<script setup>
// import { watch } from "vue";

import { reactive } from "vue";

// hide auto flow
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  modal: {
    type: Boolean,
    default: false,
  },
  title: String,

  initType: {
    type: String,
    default: "dialog", //  flow | dialog
  },
});

const data = reactive({
  teleport: true,
});

const emit = defineEmits(["update:modelValue"]);

// watch(props.)
</script>
<style lang="scss" scoped>
.dialog-bg {
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.dialog-flow {
  position: absolute;
}

.dialog-header,
.dialog-content,
dialog-footer {
  padding: 1em 1em 0.5em 1em;
  border: 1px solid red;
}
.dialog-header {
  position: relative;
  .close {
    position: absolute;
    top: top;
    right: 1em;
    cursor: pointer;
    font-size: 1.2em;
  }
}

.dialog {
  position: absolute;
  width: 70%;
  border: 2px solid;
  top: 18vh;
}
</style>
