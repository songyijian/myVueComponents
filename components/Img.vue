<template>
  <div @click="handlClick">
    <el-image
      style="width: 100px; height: 100px"
      :src="value"
      :preview-src-list="srcList"
    ></el-image>
  </div>
</template>

<script>
export default {
  name: "Img",
  // emits: ["call"],
  props: {
    value: {
      required: true,
    },
  },
  created() {
    console.log(this.$attrs);
  },
  computed: {
    srcList() {
      return [this.value];
    },
  },
  methods: {
    handlClick() {
      // this.$emit("call");
    },
  },
};
</script>
