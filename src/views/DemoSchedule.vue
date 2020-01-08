<template>
<div>
  <h1>Schedule - 小时周期控件</h1>
  <div class="row" v-if="sval">
    <Schedule
      @change="fn" :tdSize="30" :disabled="disabled" :val="sval" 
    ></Schedule>
  </div>
  <div class="row">
    <span class="btn" @click="disabledfn">disabled: {{disabled}}</span>
  </div>
  <div class="row">{{gval}}</div>
  <pre>
    历史版本
      v 20190729
        API
          setType 改为 disabled,
          originVal 改为 val, 
          onChange 改为 change
        算法函数修改
      v 20190718
        硬核bug修复，tdsize设置最小值，val校验规则修改（错了自行检查不做提示）
      v 20180727
    功能
      1.支持单位框选、点选
      2.行列快选、反选
      3.快捷选择面板
    API
      &lt;Schedule @change="fn" :val="" >
        :val="[]"           #必须是只包含1|0的168位数组 (1选，2未选)*
        @change="fn"      #修改监听函数fn(val)
        :disabled="true"    #是否可编辑
        :tdSize="30"        #每个格子的大小(px) 不<16
        :timeHeight="30"    #0-23小时列快速选择按钮高度(px) 不<16
        :dayWidth="50"      #周1-7行速选择按钮宽度(px) 不<16 [高度是根据tdSize算出来的]
  </pre>
</div>
   

</template>

<script>
import Schedule from '~contol/Schedule'
export default {
  name: 'DemoSchedule',
  components: {Schedule},
  data(){
    return{
      disabled:true,
      // sval:Array(24*7).fill(1),
      sval:null,
      gval:null,
    }
  },
  mounted(){
    this.$get('/mock/Schedule',{a:1}).then(res=>{
      // console.log(res);
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
