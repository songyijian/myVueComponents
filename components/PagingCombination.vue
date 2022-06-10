<template>
  <Table ref="tableRef" :data="data" :config="config" v-bind="$attrs"></Table>
  <div class="paginationConfiguration">
    <Pagination
      v-bind="pageData"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onIndexChange"
    ></Pagination>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, defineExpose } from "vue";
const tableRef = ref(null);
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
    type: [String, Number],
    default: "",
  },
  pageData: {
    type: Object,
    default: () => {},
  },
});
const selectionList = ref([]);
const emit = defineEmits(["onIndexChange", "onSizeChange"]);
const onIndexChange = (val) => {
  emit("onIndexChange", val);
};
const onSizeChange = (val) => {
  emit("onSizeChange", val);
};
const toggleSelection = (rows) => {
  tableRef.value.toggleSelection(rows);
};
defineExpose({
  toggleSelection,
});
</script>

<style scoped lang="scss">
.paginationConfiguration {
  display: flex;
  justify-content: end;
  padding-top: 70px;
}
</style>
