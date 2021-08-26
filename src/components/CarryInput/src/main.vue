<!--
 * @Description  : CarryInput
 * @Author       : yijian
 * @Version      : 1.0.0
 * @Date         : 2021-07-02 17:30:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-26 19:17:03
-->
<template>
  <div class="carry-input">
    <div class="carry-input-slot">
      <slot>₦</slot>
    </div>
    <input type="text" v-model="a" @input="onInput" :disabled="disabled" />
  </div>
</template>

<script>
import { enQuantile, deQuantile } from '@/utils/tools.js'
export default {
  name: 'CarryInput',
  props: {
    value: {
      required: true
    },
    disabled: {
      typeof: Boolean,
      default: false
    },
    precision: Number
  },
  data() {
    return {
      a: this.value
    }
  },
  watch: {
    a: {
      immediate: true,
      handler(t) {
        this.a = enQuantile(t, this.precision)
        this.$emit('input', deQuantile(this.a))
      }
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
.carry-input {
  position: relative;
  & > input {
    box-sizing: border-box;
    height: 52px;
    background: #f8f8fb;
    border-radius: 12px;
    padding: 15px 16px;
    padding-left: 15px + 26px;
    width: 100%;
  }
  & > .carry-input-slot {
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
