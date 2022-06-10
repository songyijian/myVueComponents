<!--
 * @Description: 配置详情组件
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-05-24 11:10:34

<InfoStyle titleWidth|labelWidth=number itemStyle="每条数据样式" ></InfoStyle>
config = [{
  width: 180, // titleWidth:180
  label: 'Gender',
  value: 'value存在直接使用，prop、filter 都不会执行',
  prop: 'gender',
  filter: (val=data[prop], item, data) => val + '/',
  onClick(){},
  component:自定义组件
},]
-->
<template>
  <div :class="{ 'info-style': true, inline: inline }">
    <div
      class="item"
      :style="itemStyle"
      v-for="item in config"
      :key="item.prop"
    >
      <div
        class="title el-form-item__label"
        :style="{ width: myLabelWidth(item) }"
      >
        {{ item.label }}
      </div>

      <div class="content el-form-item__content">
        <template v-if="item.component">
          <component
            v-bind="inAttr(item)"
            :is="item.component"
            :value="empty(item)"
          />
        </template>
        <template v-else>
          {{ empty(item) }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoStyle",
  props: {
    config: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => {},
    },
    labelWidth: {
      type: Number,
      default: 180,
    },
    titleWidth: {
      type: Number,
    },
    itemStyle: {
      type: Object,
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    inAttr(cf) {
      let attrs = {};
      Object.keys(cf).forEach((item) => {
        item !== "component" && (attrs[item] = cf[item]);
      });
      return attrs;
    },
    myLabelWidth(item) {
      return (item.width || item.titleWidth || this.labelWidth) + "px";
    },
    empty(item) {
      const { value, filter, prop } = item;
      if (value || value === 0) return value;
      const val = this.data[prop];
      if (filter) return filter(val, item, this.data);
      if (val || val === 0) return val;
      return "-";
    },
  },
};
</script>

<style lang="scss" scoped>
.inline {
  display: flex;
  flex-flow: row wrap;
}
.info-style {
  .item {
    display: flex;
    align-items: center;
    padding: 0.5em;
  }
  .title {
    font-weight: bold;
    text-align: left;
    line-height: inherit;
    flex: 0 0 auto;
  }
  .content {
    margin: 0;
    line-height: inherit;
  }
}
</style>
