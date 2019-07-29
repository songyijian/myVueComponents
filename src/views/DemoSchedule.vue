<template lang="pug">
div
  h1 Schedule - 小时周期控件

  .row(v-if="sval")
    Schedule(@onchange="fn" :tdSize="30" :disabled="disabled" :originVal="sval" )
  
  .row
    span.btn(@click="disabledfn") 编辑状态

  .row {{gval}}

  pre(v-text="api")

</template>

<script>
import Schedule from '~contol/Schedule'
export default {
  name: 'DemoSchedule',
  components: {Schedule},
  data(){
    return{
      disabled:true,
      sval:null,
      gval:null,
      api:`
        Schedule(
          :originVal="[]"   //- 必须是只包含1|0的168位数组 (1选，2未选)*
          @onchange="fn"    //- 修改监听函数fn(val)
          :tdSize="30"      //- 每个格子的大小(px)，最小16
          :disabled="true"  //- 是否可编辑
          :timeHeight="30"  //- 0-23小时列快速选择按钮高度(px)
          :dayWidth="50"    //- 周1-7行速选择按钮宽度(px)，高度是根据tdSize算出来的
          Schedule
        )
      `
    }
  },
  mounted(){
    
    // this.$http.get('/mock/Schedule',{params:{a:1}}).then(res=>{
    this.$get('/mock/Schedule',{a:1}).then(res=>{
      console.log(res);
      if(res.code===200){
        this.sval = res.data
      }
    })
  },
  methods:{
    disabledfn(){
      this.disabled = !this.disabled
    },
    fn(n){
      this.gval = n
    },
    
  }
}
</script>
