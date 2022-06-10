<!--
 * @Description:配置表格组件
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-05-24 11:10:34
-->
<template>
  <el-table
    ref="_table"
    :data="data"
    style="width: 100%"
    class="tableCustom"
    :header-cell-style="{ background: '#FAFAFA' }"
    v-bind="$attrs"
  >
    <template v-for="item in config" :key="JSON.stringify(item)">
      <el-table-column
        v-bind="item"
        v-if="
          item.type === 'index' ||
          item.type === 'selection' ||
          item.type === 'expand'
        "
      ></el-table-column>

      <el-table-column v-else v-bind="item">
        <!-- <template v-if="item.component" v-slot="scope">
          <component
            v-bind="inAttr(item)"
            :is="item.component"
            :value="empty(item, scope.row)"
          />
        </template> -->

        <template v-if="item.component" v-slot="scope">
          <component
            v-for="(el, idx) in comps(item)"
            :is="el.component"
            :value="empty({ ...item, ...el }, scope.row)"
            v-bind="inAttr({ ...item, ...el }, scope.row)"
            :key="`${idx}-${item.prop}`"
          />
        </template>

        <template v-else v-slot="scope">
          {{ empty(item, scope.row) }}
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  name: "Table",
  props: {
    config: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    inAttr(item, row) {
      let attrs = {};
      Object.keys(item).forEach((o) => {
        (o !== "component" || o !== "bindfn") && (attrs[o] = item[o]);
      });
      if (typeof item.bindfn === "function") {
        const { prop } = item;
        const val = item.value || row[prop];
        const bdata = item.bindfn(val, item, row);
        attrs = {
          ...attrs,
          ...bdata,
        };
      }

      return attrs;
    },
    empty(item, row) {
      const { value, filter, prop } = item;
      if (value || value === 0) return value;
      const val = row[prop];
      if (filter) return filter(val, item, row);
      if (val || val === 0) return val;
      return "-";
    },
    comps(item) {
      const { component } = item;
      return Array.isArray(component) ? component : [item];
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs._table.toggleRowSelection(row, undefined);
        });
      } else {
        this.$refs._table.clearSelection();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tableCustom {
  width: 100%;
  margin-top: 20px;
}
</style>
