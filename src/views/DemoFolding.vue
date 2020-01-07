<template>
  <div class="about">
    <h1>Folding - 折叠面板</h1>
    <div class="row">
      <Folding @change="chengFn" :status="status" :disabled="disabled">
        <template slot="header"> title - 展开状态：{{status}}</template>
        <template slot="body" class="bodys"> body txt </template>
      </Folding>
    </div>
    <div class="row">
      <span class="btn" @click="disabledfn">disabled: {{disabled}}</span>
    </div>

    <div class="row">
      <pre>
        &lt;Folding @change="chengFn" >
          &lt;template slot="header"> title txt &lt;/template>
          &lt;template slot="body" class="bodys"> body txt &lt;/template>
        &lt;/Folding>

        Attr:
        :status="false" ( boolean: false折叠状态 | true展开 )
        :disabled="false" （boolean : 禁用）
        
        Events:
          @change="" (func : 折叠动作回掉)

        domContent:(插槽slot)
          <template slot="header"> title txt </template> ( 头部内容 )
          <template slot="body" class="bodys"> body txt </template> （ 展开内容区域 ）
      </pre>
    </div>
  </div>
</template>

<script lang="js">
import Folding from '~contol/Folding'
export default {
  name: 'DemoFolding',
  components: {Folding},
  data(){
    return{
      status:true,
      disabled:true
    }
  },
  mounted(){

  },
  methods:{
    disabledfn(){
      this.disabled = !this.disabled
    },
    chengFn(n){
      this.status = n
    }
    
  }
}
</script>
