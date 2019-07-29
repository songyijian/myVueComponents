/**

V2019.04.16

  <GetFileBase64
    :iconTxt:'点击上传图片',     //icon下面的一段描述文字，false不显示
    :rulesText="上传内容错误"    //验证描述，错误描述
    :rules="upimg.rulesrun"    //(废弃) 显示验证错误状态
    :validateState:'',         //显示验证状态，false（验证文字红框），true（绿色框），!Boolean（不显示）
    :acceptArray="['image/jpeg','image/jpg','image/png']"   //允许上传的文件类型
    :disabled="false"           //禁用
    @onchange="fn"   //fn({ files:[], base64:'',imgData:{} }) 文件信息
  />

  <GetFileBase64 >
    <img src="" alt=""> //这里可以用来显示图片，或者文件字名
  </GetFileBase64>

*/

<template lang="html">
  <div class="el_upload_box">
    <div tabindex="0" class="el_upload" :class="{ 'state_err':validateState===false, 'state_yes':validateState===true, 'upload_disabled':disabled}" @click="onClick" >
      <input type="file" style="display:none" :disabled="disabled"
      @change="avatarUploader($event)"
      :accept="acceptArray.toString()" ref="file" ></input>
      <div class="uploader_icon_box">
        <span class="icons" title="上传">&#xe604;</span>
        <span v-if="iconTxt!==true">{{iconTxt}}</span>
      </div>
      <div class="upload_slot">
        <slot></slot>
      </div>
    </div>
    <p class="upload_err" v-if="validateState===false">{{rulesText}}</p>
  </div>
</template>

<script lang="js">
export default {
  name: 'GetFileBase64',
  props: {
    rulesText : {
      // 验证描述，错误描述
      type: String,
      default:'请上传文件'
    },
    validateState:{
      // 显示验证状态，false（验证文字红框） ，true（绿色框），''（不显示）
      default: ''
    },
    iconTxt:{ 
      // icon下面的一段描述文字，false不显示
      default: false
    },
    acceptArray : { 
      // 允许上传的文件类型['image/jpeg','image/jpg','image/png']
      type: Array,
      default: []
    },
    disabled : {  
      // 禁用
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
        imgData:null
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
      let imgType = files[0].type;

      if(files.length > 0){
          this.fileData.files = files[0];
          // 获取 base64
          let reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = (e)=> {
            let base64 = e.target.result;
            this.fileData.base64 = base64;
            // 图片信息
            if(imgType.indexOf("image")>=0){
              let image = new Image();
              image.src = base64;
              image.onload=()=>{
                console.log(files[0])
                let {name, size, type,lastModified} = files[0]
                this.fileData.imgData = {
                  width:image.width,
                  height:image.height,
                  name, size, type,lastModified
                }
                this.$emit('onchange',this.fileData)
              }
            }else{
              // 显然不是图片文件
              this.$emit('onchange',this.fileData)
            }
          }
      }

    }
  },
  computed: {}
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
.el_upload_box{ width:178px; min-height: 178px;
  .el_upload {
    width:178px; height: 178px;
    border: 1px dashed #d8dce5;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background: #fff;
    outline:none;

    &:hover{ border: 1px dashed $color_main;}
    &:hover .uploader_icon_box{
      z-index: 2; background:rgba(0, 0, 0, 0.05);
      span{ color:$color_main; }
    }
    input{ display: none; outline:none; height:1px; width:1px;}
    img{ width: 100%;}
    .uploader_icon_box{ 
      position: absolute;
      display: flex;
      top: 0;
      left: 0;
      font-style: normal;
      width: 100% !important;
      height: 100%;
      text-align: center;
      z-index: 1;
      flex-flow: column nowrap;
      justify-content: center;
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

  .state_err{ border: 1px solid #f56c6c; }
  .state_yes{ border: 1px solid #67C23A; }
  .upload_err{ color: #fa5555; font-size: 12px; line-height: 1; padding-top: 4px; text-align: left;}
}

</style>
