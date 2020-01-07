<template lang="html">
  <div class="folding_box">
    <div @click="openfn" class="header_box" :class="{'disabledstyle':disabled }">
      <div class="icons_box">
        <span class="icons folding_icon" :class="{'foldingOpen':open }" title="上传">&#xe8ee;</span>
      </div>
      <div class="header_title_box">
        <slot name="header"></slot>
      </div>
    </div>

    <div v-show="open">
      <slot name="body"></slot>
    </div>
  </div>
</template>


<script lang="js">
/**
  Attr:
    :status="false" ( boolean: false折叠状态 | true展开 )
    :disabled="false" （boolean : 禁用）
    
  Events:
    @change="" (func : 折叠动作回掉)

  domContent:(插槽slot)
    <template slot="header"> title txt </template> ( 头部内容 )
    <template slot="body" class="bodys"> body txt </template> （ 展开内容区域 ）

  案例：
    <Folding @change="chengFn" >
      <template slot="header"> title txt </template>
      <template slot="body" class="bodys"> body txt </template>
    </Folding>
*/
export default {
  name: 'Folding',
  props: {
    status:{
      type: Boolean,
      default: false
    },
    disabled:{
      type: Boolean,
      default: false
    }
  },
  mounted() { },
  components: {},
  data() {
    return {
      open: this.status
      // status:false
    }
  },
  methods: {
    openfn(){
      if(!this.disabled){
        this.open = !this.open
        this.$emit('change',this.open)
      }
    }
  },
  computed: { }
}
</script>


<style scoped lang="scss">
  @font-face {
    font-family: 'iconfont';  /* project id 805599 */
    src: url('//at.alicdn.com/t/font_805599_uxtxxdz1ib.eot');
    src: url('//at.alicdn.com/t/font_805599_uxtxxdz1ib.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_805599_uxtxxdz1ib.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_805599_uxtxxdz1ib.woff') format('woff'),
    url('//at.alicdn.com/t/font_805599_uxtxxdz1ib.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_805599_uxtxxdz1ib.svg#iconfont') format('svg');
  }
  .icons{
    font-family:"iconfont" !important;
    font-size:26px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  $color_main : #409EFF;
  
  .folding_box{ 
    .header_box{ padding:0.5rem 0; display: flex; flex-flow:row nowrap; cursor: pointer;
      .icons_box{  display: flex; flex-flow:column nowrap; justify-content:center;  cursor: pointer;
        .folding_icon{ font-size: 1rem; line-height: 1.5rem; display: block; height: 1.5rem; width: 1.5rem;  text-align: center; color: #ccc; transition: transform .3s;}
        .foldingOpen{ transform: rotate(90deg); }
      }
      .header_title_box{ flex:1 1 auto }
    }
    // 禁用
    .header_box.disabledstyle{ cursor: not-allowed}
  }
</style>
