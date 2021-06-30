<template>
  <div class="input-wrap">
    <!-- <div v-for="item in codeArr">{{ item.idx }}</div> -->
    <input
      type="txt"
      onpaste="return false"
      v-for="item in codeArr"
      v-model="item.value"
      :index="item.idx"
      :key="item.idx"
      :ref="item.idx"
      @input="onInput($event, item, item.idx)"
      @keyup="onKeyup($event, item, item.idx)"
      maxlength="1"
    />
  </div>
</template>

<script>
const idx = 0;

function format(array = []) {
  return array.reduce((a, item) => a + item.value, "");
}

function deformat(str = "", len) {
  const strs = [...String(str)];
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push({ value: strs[i] || "", back: false, idx: idx + i });
  }
  return arr;
}

export default {
  name: "PaymentPin",
  components: {},
  props: {
    value: {
      type: String,
      default: ""
    },
    length: {
      type: Number,
      default: 4
    },
    type: {
      type: String,
      validator(value) {
        return value === "number" || value === "txt";
      },
      default: "number"
    }
  },
  data() {
    const config = deformat(this.$props.value, this.$props.length);
    return {
      codeArr: config
    };
  },
  mounted() {},
  methods: {
    typeValidate(agr) {
      const re = this.type === "number" ? /[0-9]/g : /[a-z]/g;
      return re.test(agr);
    },
    onInput(e, item, id) {
      // console.log(e.data);
      const len = this.codeArr.length;
      const val = String(e.data)
        .replace(/\s/, "")
        .charAt(0);

      item.value = this.typeValidate(val) ? val : "";
      this.$emit("input", format(this.codeArr));

      if (item.value !== "") {
        if (id === len - 1) return;
        this.$refs[`${id + 1}`][0].focus();
      }
    },
    onKeyup(e, item, id) {
      if (id === 0) return;
      if (e.keyCode === 8) {
        item.value = "";
        this.$emit("input", format(this.codeArr));
        this.$refs[`${id - 1}`][0].focus();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.input-wrap {
  display: inline-block;
  // margin-top: 16px;
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
