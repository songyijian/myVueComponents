<!--
 * @Description: 公共分页列表
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-05-23 14:34:03
-->
<template>
  <el-pagination
    v-bind="$attrs"
    :page-size="pageSize"
    :current-page="pageNo"
    :page-sizes="[10, 50, 100]"
    :layout="layout"
    :total="total"
  ></el-pagination>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageNo: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
  },
};
</script>
