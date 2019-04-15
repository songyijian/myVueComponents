<template lang="html">
  <div class="el_upload_box" :style="{'width':`${sizeW}px`, 'min-height':`${sizeH}px`}">
    <div tabindex="0" class="el_upload"
          :class="{'upload_err_border':!rules,'upload_disabled':disabled}"
          :style="{'width':`${sizeW}px`, 'height':`${sizeH}px`}"
          @click="onClick" >
      <input type="file"
        style="display:none"
        :disabled="disabled"
        @change="avatarUploader($event)"
        :accept="acceptArray.toString()" ref="file" >
      </input>

      <div class="uploader_icon_box">
        <span class="icons" title="上传">&#xe604;</span>
      </div>
      <div class="upload_slot">
        <slot></slot>
      </div>
      <!-- <div>
        <span class="icons" title="删除">&#xe605;</span>
        <span class="icons" title="修改">&#xe600;</span>
      </div> -->
    </div>
    <p class="upload_err" v-if="!rules">{{rulesText}}</p>
  </div>
</template>

<script lang="js">
/**
<GetFileBase64
  :sizeH="178"  //大小（px）
  :sizeW="178"  //大小（px）
  :rulesText="上传内容错误"   //验证描述，错误描述
  :rules="upimg.rulesrun"    //显示验证状态，false（验证文字红框） ，true（绿色框）
  :acceptArray="['image/jpeg','image/jpg','image/png']"   //允许上传的文件类型
  :disabled="false"     //禁用
   @onchange="fn"       //fn(fileData:{
                           files:[],
                           base64:null,
                           imgData:{width:image.width,height:image.height} //上传图片文件才有
                         })
/>
<GetFileBase64 >
  //这里可以用来显示图片，或者文件字名
  <img src="" alt="">
</GetFileBase64>
*/

export default {
  name: 'GetFileBase64',
  props: {
    sizeH : {//验证描述，错误描述
      type: Number,
      default:178
    },
    sizeW : {//验证描述，错误描述
      type: Number,
      default:178
    },
    rulesText : {//验证描述，错误描述
      type: String,
      default:'请上传文件'
    },
    rules : {//显示验证状态，false（验证文字红框） ，true（绿色框）
      type: Boolean,
      default: true
    },
    acceptArray : { //允许上传的文件类型['image/jpeg','image/jpg','image/png']
      type: Array,
      default: []
    },
    disabled : {//禁用
      type: Boolean,
      default: false
    }
  },
  mounted() { },
  components: {},
  data() {
    return {
      fileData:{
        files:[],
        base64:null,
        // imgData:{width:image.width,height:image.height}
      }
    }
  },
  methods: {
    onClick(){
      var file = this.$refs.file;
      file.click()
    },
    avatarUploader(event){ // 图片上传
      let files = event.target.files;
      if(!files[0]){ return }
      let mType = files[0].type;

      if(files.length > 0){
          this.fileData.files = files[0];
          // 获取 base64
          let reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = (e)=> {
            let base64 = e.target.result;
            this.fileData.base64 = base64;
            // 图片信息
            if(mType.indexOf("image")>=0){
              let media = new Image();
                  media.src = base64;
                  media.onload=()=>{
                    this.fileData.imgData = {width:media.width,height:media.height} // 图片信息
                    media=null;
                    this.$emit('onchange',this.fileData)
                  }
                  media.onerror=()=>{image=null}
            }else{
              this.$emit('onchange',this.fileData) // 显然不是图片文件
            }
          }
      }
      // else{ 显然没有执行上传文件 }
    }
  },
  computed: {},
  watch:{
    rules(){}

  }

}
</script>


<style scoped lang="scss">
@font-face {
  font-family: 'iconfont';  /* project id 805599 */
  src: url('//at.alicdn.com/t/font_805599_jm451yn3z5.eot');
  src: url('//at.alicdn.com/t/font_805599_jm451yn3z5.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_805599_jm451yn3z5.woff') format('woff'),
  url('//at.alicdn.com/t/font_805599_jm451yn3z5.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_805599_jm451yn3z5.svg#iconfont') format('svg');
}
.icons{
  font-family:"iconfont" !important;
  font-size:26px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
$color_main : #409EFF;
/* 上传 */
.el_upload_box{ //width:178px; min-height: 178px;
  display: inline-block;
  .el_upload {
    border: 1px dashed #d8dce5;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    // background: #fff;
    outline:none;

    &:hover{ border: 1px dashed $color_main;}
    &:hover .uploader_icon_box{ z-index: 2; background:rgba(255,255,255,0.5); color: #000;
      span{ margin: 0.5rem;}
    }
    input{ display: none; outline:none; height:1px; width:1px;}
    img{ width: 100%;}
    .uploader_icon_box{ position:absolute; top: 0; left: 0; width: 100% !important; height: 100%;
      display:flex; flex-flow: wrap nowrap; justify-content: center; align-items:center;
      // span:hover{ color:$color_main;}
    }
    .upload_slot{position:absolute; top: 0; left: 0; width: 100% !important; height: 100%;}
    // .uploader_icon_box.hover_show:hover{
    //   opacity:1;
    // }
    // .uploader_icon_box.set_rm{
    //   span{ color:#fff; margin: 0.5rem;}
    //   background:rgba(0,0,0,0.4);
    // }
  }
  // 禁用
  .el_upload.upload_disabled {
      pointer-events:none;
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
  }
  .upload_err_border{ border: 1px solid red; }
  .upload_err{ color: #fa5555; font-size: 12px; line-height: 1; padding-top: 4px; text-align: left;}
}
</style>
