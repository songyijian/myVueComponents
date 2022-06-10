<template>
  <el-button v-bind="configs" @click="update">{{
    configs.value
  }}</el-button>
</template>

<script setup>
import { defineProps, computed, defineEmits } from "vue";
const props = defineProps({
  config: {
    type: Object,
    default: () => {},
  },
});
const configs = computed(() => {
  const defaultConfig = {
    size: "default",
    type: "primary",
    value: "查询",
  };
  return Object.assign(defaultConfig, props.config);
});
const emits = defineEmits(["update"]);
const update = () => {
  emits("update");
};
</script>

<style scoped lang="scss"></style>
