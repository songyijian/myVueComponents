<template>
  <el-button class="linkConfig" type="primary" text @click="update">{{
      text
    }}</el-button>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
defineProps({
  text: {
    type: String,
    default: "查看",
  },
});
const emits = defineEmits(["update"]);
const update = () => {
  emits("update");
};
</script>

<style scoped lang="scss">
.linkConfig {
  padding: 0;
}
</style>
