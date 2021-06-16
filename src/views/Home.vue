<template>
  <div class="home">
    <h1>vue contol </h1>
    <img :src="'~assets/logo.png'" alt="">
    <Qfenwei v-model="inputval" @validatefn="onValidate"></Qfenwei>
    {{inputval}}
  </div>
</template>

<script>
  import Qfenwei from "~contol/Qfenwei";

  export default {
    name: 'home',
    components: {
      Qfenwei
    },
    data() {
      return {
        inputval: 123
      }
    },
    mounted() {

    },
    methods: {
      onValidate(val) {
        console.log(val);
      }
    }
  }
</script>