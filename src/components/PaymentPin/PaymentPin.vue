<!--
 * @Description: PaymentPin 
 * @Author: yijian
 * @Version: 1.0.0
 * @Date: 2021-06-28 18:08:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-28 18:23:38
-->

<template>
  <div class="input-wrap">
    <input
      type="text"
      v-for="(item, idx) in codeArr"
      :key="idx"
      v-model="item.value"
      :ref="`code${[idx]}`"
      @input="onInput($event, item, idx)"
      @keyup="onKeyup($event, item, idx)"
      maxlength="1"
    />
  </div>
</template>

<script>
// format 对象格式成string
function format(array = []) {
  return array.reduce((a, item) => a + item.value, "");
}

// 格式为对象
function deformat(str = "") {
  return str.length !== 4
    ? [
        { value: "", back: false },
        { value: "", back: false },
        { value: "", back: false },
        { value: "", back: false }
      ]
    : [...String(str)].map(value => ({ value: value || "", back: false }));
}

export default {
  name: "PaymentPin",
  components: {},
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    let pz = deformat(this.$props.value);
    return {
      codeArr: pz
    };
  },
  mounted() {},
  methods: {
    onInput(e, item, idx) {
      const valLen = this.codeArr.length;
      const length = e.target.value.length;

      item.value = e.target.value.charAt(length - 1);
      if (item.value !== "") {
        this.isError = false;
        item.back = false;
        if (idx === valLen - 1) return;
        this.$refs[`code${+idx + 1}`][0].focus();
      }
      this.$emit("input", format(this.codeArr));
    },
    onKeyup(e, item, idx) {
      if (idx === 0) return;
      if (e.keyCode === 8 && e.target.value == "") {
        if (item.back === false) {
          item.back = true;
          console.log("item.back", item.back);
        } else {
          this.$refs[`code${idx - 1}`][0].focus();
          this.codeArr[idx - 1].value = "";
          this.codeArr[idx - 1].back = true;
        }
      }

      this.$emit("input", format(this.codeArr));
    }
  }
};
</script>

<style lang="scss" scoped>
.input-wrap {
  display: inline-block;
  input {
    background-color: #f8f9fa;
    text-align: center;
    box-sizing: border-box;
    &:focus {
      border: 1px solid #f15a24;
      color: #f15a24;
    }
    width: 40px;
    height: 40px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
  input ~ input {
    margin-left: 8px;
  }
}
</style>
