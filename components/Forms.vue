<!--
 * @Description: 配置，表单组件
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-05-24 15:15:15
<Forms :data="{}" ,:config="[]" :rules="非必填"/></Forms>
config = [{
  width: 180, // titleWidth:180
  label: "url",
  prop: "url",
  rules: {}, // 校验规则
  component: Img, // 第一优先级
  type:"numbe|...|html" // 第二
  onClick() {
    alert(12);
  },
  // 一下参数： component、type=html｜btn 下生效
  filter: (val) => val + "+ filter",
  value:'',
},]
-->
<template>
  <el-form ref="_forms" :model="mydata" v-bind="$attrs">
    <el-form-item
      v-for="item in config"
      :key="item.prop"
      :label-width="myLabelWidth(item)"
      :style="itemStyle"
      :label="item.label"
      :prop="item.prop"
      :rules="item.rules"
      v-show="!item.hide"
    >
      <template v-if="item.component">
        <component
          v-bind="inAttr(item)"
          :is="item.component"
          :value="empty(item)"
        />
      </template>

      <template v-else>
        <el-select
          v-if="item.type === 'select'"
          v-model="mydata[item.prop]"
          v-bind="item"
          :placeholder="item.placeholder"
          clearable
        >
          <el-option
            v-for="n in item.opations"
            :label="n.label"
            :value="n.value"
            :key="n.values"
          ></el-option>
        </el-select>

        <el-date-picker
          v-else-if="dateArr.indexOf(item.type) > -1"
          v-model="mydata[item.prop]"
          :type="item.type"
          :range-separator="item.rangeSeparator"
          :start-placeholder="item.startPlaceholder"
          :end-placeholder="item.endPlaceholder"
          :placeholer="item.placeholder"
          v-bind="item.options"
          clearable
        >
        </el-date-picker>

        <el-input-number
          v-else-if="item.type === 'number'"
          v-model="mydata[item.prop]"
          v-bind="item"
        ></el-input-number>

        <el-button
          v-else-if="item.type === 'button' || item.type === 'btn'"
          v-bind="item"
          :type="item.typeStyle || btnTypeStyle"
        >
          {{ empty(item) }}
        </el-button>

        <div v-else-if="item.type === 'html'" v-html="empty(item)"></div>

        <el-input
          v-else
          :type="item.type"
          v-model="mydata[item.prop]"
          v-bind="item"
          :placeholder="item.placeholder"
          clearable
        ></el-input>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Forms",
  props: {
    config: {
      type: Object,
      default() {
        return {
          list: [],
        };
      },
    },
    data: {
      type: Object,
      default() {
        return {};
      },
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
  },
  data() {
    return {
      dateArr: [
        "year",
        "month",
        "date",
        "week",
        "datetime",
        "datetimerange",
        "daterange",
      ],
      btnTypeStyle: "primary",
      mydata: this.data,
    };
  },
  watch: {
    data(val) {
      this.mydata = val;
    },
  },
  methods: {
    async validate() {
      return await this.$refs._forms.validate();
    },
    async resetFields() {
      return await this.$refs._forms.resetFields();
    },
    myLabelWidth(item) {
      return (item.width || this.titleWidth || this.labelWidth) + "px";
    },
    operate(prop) {
      console.log(prop);
      this.$emit(prop, this.form);
    },
    inAttrTrimEvent(cf) {
      const a = this.inAttr(cf);
      let attrs = {};
      Object.keys(a).forEach((item) => {
        item.length > 2 && item.indexOf("on") === 0 && (attrs[item] = a[item]);
      });
      return attrs;
    },
    inAttr(cf) {
      let attrs = {};
      Object.keys(cf).forEach((item) => {
        item !== "component" && (attrs[item] = cf[item]);
      });
      return attrs;
    },
    empty(item) {
      const { value, filter, prop } = item;
      if (value || value === 0) return item.value;
      const val = this.data[prop];
      if (filter) return filter(val, item, this.data);
      if (val || val === 0) return val;
      return "-";
    },
  },
};
</script>

<style scoped></style>
