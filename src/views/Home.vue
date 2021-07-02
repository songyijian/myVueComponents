<template>
  <div class="home">
    <h1>vue contol</h1>
    <img :src="'@assets/logo.png'" alt="" />
    <!-- <Quantile v-model="inputval" @validatefn="onValidate"></Quantile> -->
    {{ inputval }}
  </div>
</template>

<script>
// import Quantile from "@contol/Quantile";

export default {
  name: "home",
  components: {
    // Quantile,
  },
  data() {
    return {
      inputval: 123,
    };
  },
  mounted() {},
  methods: {
    onValidate(val) {
      console.log(val);
    },
  },
};
</script>
