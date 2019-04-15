<template>
  <div class="hello">
    <h1>xxxxx</h1>
    <div class="">
      <Schedule @onchange="fn" :tdSize="30" :setType="true" :originVal="originVal" />
    </div>
  </div>
</template>

<script>
import Schedule from '@/components/Schedule.vue'
export default {
  data(){
    return{
      originVal:[...`000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`].map(item=>item*1)
      // tdSize: "30"
      // setType:  "true"
      // timeHeight: "30"
      // dayWidth: "50"
    }
  },
  methods:{
    fn(val){
      console.log(val);
    }
  },
  components: {
    Schedule
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >

</style>
