<!--
 * @Description: 详情，伪表格
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-28 17:09:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-28 19:30:40
-->

<template>
  <div class="grid" :style="style">
    <slot><p class="empty-text">暂无数据</p></slot>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    columns: {
      type: String,
      default: 'auto'
    },
    rows: {
      type: String,
      default: 'auto'
    }
  },
  computed: {
    style() {
      const len = Object.keys(this.$slots).length;
      console.log(len);

      return len
        ? {
            'grid-template-columns': this.columns,
            'grid-template-rows': this.rows
          }
        : {};
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  // grid-template-columns: 100px auto 100px;
  // grid-template-rows: 50px 50px auto;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid #e4e7ed;
  border-top: 0;
  font-size: 14px;
  color: #606266;
  border-left: 0;

  > * {
    box-sizing: content-box;
    overflow: hidden;
    margin: 0;
    padding: 0;
    margin-right: -1px;
    margin-bottom: -1px;
    border: 1px solid #e4e7ed;
  }

  .empty-text {
    border-right: 0;
    text-align: center;
    height: 60px;
    line-height: 60px;
    width: 100%;
    color: #909399;
  }
}
</style>

<!--
 <style lang="scss" scoped>
.item-row {
  > * {
    line-height: 45px;
    display: block;
    text-align: center;
  }
  strong {
    background: rgb(248, 248, 249);
    color: #909399;
    font-weight: 500;
    border-bottom: 1px solid #e4e7ed;
  }
}
</style>
-->
