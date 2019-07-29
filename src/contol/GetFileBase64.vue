<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-19 17:13:34
 * @LastEditTime: 2019-07-19 19:56:39
 * @LastEditors: Please set LastEditors

   <GetFileBase64
    :sizeH="178"  //大小（px）
    :sizeW="178"  //大小（px）
    :multiple="false"      //多文件上传默认false 暂时不支持
    :errTip="xxxxx"         //err展示文字
    :validate=""            //验证状态控制 ‘err’ | ‘suc‘ 
    :acceptArray="['image/jpeg','image/jpg','image/png']"   //允许上传的文件类型
    :disabled="false"     //禁用
    @onchange="fn"       //fn(fileData:{
                            files:[],
                            base64:null,
                            imgData:{width,height,name,size,type} //上传图片文件才有,多文件为array
                          })
  >
    <img src="" alt="">//这里可以用来显示图片，或者文件字名
  </GetFileBase64>
 -->

<template lang="html">
  <div class="el_upload_box" :style="{'width':`${sizeW}px`, 'min-height':`${sizeH}px`}">
    <div tabindex="0" class="el_upload"
          :class="{'upload_err_border':validate==='err','upload_suc_border':validate==='suc','upload_disabled':disabled}"
          :style="{'width':`${sizeW}px`, 'height':`${sizeH}px`}"
          @click="onClick" >
      <input type="file"
        style="display:none"
        :disabled="disabled"
        :multiple="multiple"
        @change="avatarUploader($event)"
        :accept="acceptArray.toString()" ref="file"  >
      </input>
      <div class="uploader_icon_box">
        <span class="iconfont" title="上传">&#xe604;</span>
      </div>
      <div class="upload_slot">
        <slot></slot>
      </div>
    </div>
    <p class="upload_err" v-if="validate==='err'">{{errTip}}</p>
  </div>
</template>

<script lang="js">

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
    multiple : {//多文件上传
      type: Boolean,
      default:true//false
    },
    validate : {  //验证状态控制 ‘err’ | ‘suc‘ |''（不处理）
      type: String,
      default: ''
    },
    errTip : {//验证描述，错误描述
      type: String,
      default:'未通过验证'
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
      file.value = ''
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
              this.fileData.imgData = {
                base64:base64,
                width:media.width,
                height:media.height,
                name: this.fileData.files.name,
                size: this.fileData.files.size,
                type: this.fileData.files.type
              } 
              media=null;
              this.$emit('onchange',this.fileData)
            }
            media.onerror=()=>{image=null}
          }else{
            this.$emit('onchange',this.fileData) // 显然不是图片文件
          }
        }
        
      }
    }
  },
  computed: {},
  watch:{
  }

}
</script>


<style scoped lang="scss">
@import "../common/fonts/iconfont.css";

$color_main : #409EFF;
.iconfont{ font-size: 1.5rem; font-weight: bold}

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
    }
    .upload_slot{position:absolute; top: 0; left: 0; width: 100% !important; height: 100%;}
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
  .upload_suc_border{border: 1px solid #67c23a; }
  .upload_err{ color: #fa5555; font-size: 12px; line-height: 1; padding-top: 4px; text-align: left;}
}
</style>
