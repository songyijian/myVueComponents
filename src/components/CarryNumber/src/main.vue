<!--
 * @Description  : CarryNumber
 * @Author       : yijian
 * @Version      : 1.0.0
 * @Date         : 2021-07-02 17:30:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 19:14:17
-->
<template>
  <div class="myinput">
    <div class="slot">
      <slot>₦</slot>
    </div>
    <input type="text" v-model="a" @input="onInput" :disabled="disabled" />
  </div>
</template>

<script>
import { enQuantile, deQuantile } from '@/utils/tools.js'
export default {
  name: 'CarryNumber',
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {}
  },
  data() {
    // this.$slots
    return {
      a: ''
    }
  },
  watch: {
    a(t) {
      this.a = enQuantile(t)
    }
  },
  mounted() {},
  methods: {
    onInput(ev) {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/reset-input.scss';
.myinput {
  position: relative;
  & > input {
    height: 52px;
    background: #f8f8fb;
    border-radius: 12px;
    padding: 15px 16px;
    padding-left: 15px + 26px;
    width: 100%;
    // @extend .strong-num;
  }
  & > .slot {
    position: absolute;
    z-index: 9;
    top: 14px;
    left: 16px;
    display: inline-block;
    height: 24px;
    font-family: Helvetica;
    font-size: 12px;
    color: #c1cbd1;
    letter-spacing: 0;
    line-height: 24px;
  }
}
</style>
