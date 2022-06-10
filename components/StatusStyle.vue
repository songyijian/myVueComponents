<!--
 * @Description:
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-06-10 11:22:44
-->
<template>
  <span class="status">
    {{ data.value }}
  </span>
</template>
<script setup>
import { reactive, useAttrs, watch } from "vue";

const props = defineProps({
  // value: Object,
  value: String,
  color: String,
});

const arrts = useAttrs();

// console.log("***", arrts);

const data = reactive({
  value: "",
  color: "rgb(29 33 41)",
});

watch(
  [() => props.value, () => props.color],
  ([value, color]) => {
    data.value = value;
    data.color = color;
  },
  { deep: true, immediate: true }
);
</script>
<style lang="scss" scoped>
.status {
  display: inline-block;
  padding-left: 0.5em;
  position: relative;
  color: v-bind("data.color");
  &::before {
    $size: 0.35em;
    content: "";
    display: inline-block;
    height: $size;
    width: $size;
    border-radius: 50%;
    background-color: v-bind("data.color");
    position: absolute;
    top: 45%;
    left: 0;
  }
}
</style>
