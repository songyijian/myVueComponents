<template lang="html">
  <canvas id="chartCanvas" ref="chartCanvas" width="200" height="70" :aria-label="arialabel">
    {{arialabel}}
  </canvas>
</template>

<script lang="js">
  import Chart from 'chart.js'

  /**
   * arialabel , 无障碍
   * type , 图标类型 | line
   * options , 事件交互
   */
  export default {
    name: 'SpuerChart',
    components: {},
    props: {
      arialabel:{
        type: String,
        default: "无法访问的canvas元素,Your browser does not support the canvas element"
      },
      type:{
        type: String,
        default: "line" 
      },
      options:{type: Array,required: true},
      datasets:{ type: Object, required: true },
      labels:{type: Array,required: true}
    },
    mounted() {
      this.elCanvas=this.$refs.chartCanvas
      this.Chart = new Chart(this.elCanvas,{
        type:this.type,
        data:{
          labels:this.labels,
          datasets:this.datasets
        },
        options:this.options
      })
    },
    data() {
      return {
        elCanvas:null,
        Chart:null,
      }
    },
    methods: {
    },
    watch: {
      type: function (newQuestion, oldQuestion) {
        if(this.Chart){
          this.Chart.type= newQuestion
          this.Chart.update()
        }
      },
      options: function (newQuestion, oldQuestion) {
        if(this.Chart){
          this.Chart.options= newQuestion
          this.Chart.update()
        }
      },
      datasets: function (newQuestion, oldQuestion) {
        if(this.Chart){
          this.Chart.data.datasets = newQuestion
          this.Chart.update()
        }
      },
      labels: function (newQuestion, oldQuestion) {
        if(this.Chart){
          this.Chart.data.labels = newQuestion
          this.Chart.update()
        }
      }
    }
  }
</script>


<style scoped lang="scss">
  canvas{background: #fff;}
</style>
