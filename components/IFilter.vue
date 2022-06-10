<template>
  <div>
    <el-form
      :inline="true"
      :model="form"
      label-width="80px"
      v-bind="$attrs"
      label-position="left"
      size="default"
    >
      <el-row :gutter="20">
        <el-col :span="21">
          <el-form-item
            :label="item.label"
            v-for="(item, index) in config.list"
            :key="index"
            :prop="item.prop"
            v-show="!item.hide"
          >
            <span v-if="item.beforeText">{{ item.beforeText }}</span>
            <el-input
              v-model="form[item.prop]"
              suffix-icon="xxx"
              :placeholder="`请输入${item.label}` || item.placeholder"
              v-if="
                (item.type === 'text' || item.type === 'inputText') &&
                !item.hide
              "
              v-bind="item"
            ></el-input>
            <el-select
              v-model="form[item.prop]"
              :placeholder="`请选择${item.label}` || item.placeholder"
              v-else-if="item.type === 'select' && !item.hide"
              v-bind="item"
              clearable
            >
              <el-option
                :label="n.label"
                :value="n.value"
                v-for="(n, i) in item.options"
                :key="JSON.stringify(n.value + i)"
              ></el-option>
            </el-select>

            <el-date-picker
              v-else-if="dateArr.indexOf(item.type) > -1"
              v-model="form[item.prop]"
              v-bind="[item, item.options]"
              start-placeholder="请选择开始时间"
              end-placeholder="请选择结束时间"
              :type="item.type"
              size="default"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3" class="buttonConfiguration">
          <el-form-item
            :label="item.label"
            v-for="(item, index) in config.button"
            :key="index"
            :prop="item.prop"
            v-show="!item.hide"
          >
            <ButtonNormal
              v-if="item.type === 'button' && !item.hide"
              :config="item.config"
              @update="operate(item.prop)"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <el-divider style="margin: 0 0 20px 0" />
</template>

<script>
import { toRef } from "vue";
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {
          list: [],
        };
      },
    },
    content: {
      type: Object,
      default() {
        return {};
      },
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
    };
  },
  setup(props, { emit }) {
    const form = toRef(props, "content");
    const operate = (prop) => {
      emit(prop, JSON.parse(JSON.stringify(form.value)));
    };
    return {
      form,
      operate,
    };
  },
};
</script>

<style scoped lang="scss">
@import "~@/styles/mixin.scss";
.buttonConfiguration {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  border-left: 1px solid #f0f2f5;
  margin-bottom: 20px;
  .el-form-item {
    display: block;
  }
  .el-form-item:nth-child(2) {
    margin-bottom: 0;
  }
}
</style>
