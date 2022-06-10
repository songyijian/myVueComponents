<!--
 * @Description: 分页表
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-06-06 17:47:56
-->
<template>
  <Table :data="data" :config="config" v-bind="$attrs"> </Table>
  <div class="paginationConfiguration">
    <Pagination
      v-bind="pageConfig"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onIndexChange"
    ></Pagination>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from "vue";
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  config: {
    type: Array,
    default: () => [],
  },
  total: {
    type: Number,
    default: 0,
  },
  pageData: {
    type: Object,
    default: () => {},
  },
});

const pageConfig = reactive({
  pageNo: 1,
  pageSize: 10,
});

const emit = defineEmits(["pagLoad", "onIndexChange", "onSizeChange"]);

const onIndexChange = (val) => {
  pageConfig.pageNo = val;
  emit("onIndexChange", val);
  emit("pagLoad", pageConfig);
};
const onSizeChange = (val) => {
  pageConfig.pageSize = val;
  emit("onSizeChange", val);
  emit("pagLoad", pageConfig);
};

function init() {
  emit("pagLoad", pageConfig);
}

init();
</script>

<style scoped lang="scss">
.paginationConfiguration {
  display: flex;
  justify-content: end;
  padding-top: 70px;
}
</style>
