<!--
 * @Description  : CarryInput
 * @Author       : yijian
 * @Version      : 1.0.0
 * @Date         : 2021-07-02 17:30:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-27 19:18:11
-->
<template>
  <div class="carry-input">
    <div class="carry-input-slot">
      <slot>₦</slot>
    </div>
    <input type="text" v-model="a" :disabled="disabled" @change="change" />
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
      a: '' //this.value
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(t) {
        this.a = t
      }
    },
    a: {
      immediate: true,
      handler(t) {
        this.a = enQuantile(t, this.precision)
        this.$emit('input', deQuantile(this.a))
      }
    }
  },
  methods: {
    change(ev) {
      this.$emit('change', deQuantile(this.a))
    }
  }
}
</script>

<style lang="scss" scoped>
.carry-input {
  position: relative;
  & > input {
    border-radius: 0;
    border: none;
    outline: none;
    box-sizing: border-box;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-appearance: none;

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
