<!--
 * @Description: 上传控件
 * @Author: yijian.song
 * @Date: 2019-07-29 19:37:08
 * @LastEditTime: 2019-07-31 20:10:26
 * @LastEditors: Please set LastEditors

accept 属性接受一个逗号分隔的 MIME 类型字符串, 如:
  accept="image/png" or accept=".png" — 只接受 png 图片.
  accept="image/png, image/jpeg" or accept=".png, .jpg, .jpeg" — PNG/JPEG 文件.
  accept="image/*" — 接受任何图片文件类型. 
  accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" — 接受任何 MS Doc 文件类型.
 -->

<template lang="html">
  <div>
    <!-- <div class="el_upload_box" :style="{'width':`${sizeW}px`, 'min-height':`${sizeH}px`}">
      <div tabindex="0" class="el_upload"
            :class="{'upload_err_border':validate==='err','upload_suc_border':validate==='suc','upload_disabled':disabled}"
            :style="{'width':`${sizeW}px`, 'height':`${sizeH}px`}"
            @click="onClick" >
        <input type="file"
          style="display:none"
          :disabled="disabled"
          :multiple="multiple"
          @change="avatarUploader($event)"
          :accept="accept" ref="file"  >
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
    -->
    <div id="drop_area" @click="onClick" :class="{'disabled':disabled, 'drage':drageStyle}"
     @drop.prevent="drop($event)"
     @dragleave.prevent="dragleave($event)"
     @dragenter.prevent="dragenter($event)"
     @dragover.prevent
    >
      <input type="file" ref="file" style="display:none"
        @change="inputGetfile($event)"
        :disabled="disabled"
        :multiple="multiple"
        :accept="accept">
      </input>
      <slot></slot>
    </div>
	  <div id="preview"></div> 
  </div>
</template>

<script lang="js">
  export default {
    name: 'SUpload',
    components: {},
    props: {
      // sizeH : {//验证描述，错误描述
      //   type: Number,
      //   default:178
      // },
      // sizeW : {//验证描述，错误描述
      //   type: Number,
      //   default:178
      // },
      // errTip : {      //验证描述，错误描述
      //   type: String,
      //   default:'未通过验证'
      // },
      disabled : {    //不可编辑
        type: Boolean,
        default: false
      },
      drag:{          //是否支持拖拽,true可以拖拽
        type: Boolean,
        default: true
      },
      multiple : {    //多文件上传
        type: Boolean,
        default:true
      },
      accept : {      //允许上传的文件类型 = 任意类型
        type: String,
        default:'*/*'
      },
      action:{      //上传地址
        // validator
        type: String,
        validator(str){
         return typeof str==='string' && str.indexOf('/') >= 0
        }
      },
      autoUpload:{  //主动上传
        type: Boolean,
        default:true
      },
      oneByOne:{  // 是否多次提交
        type: Boolean,
        default:true
      },
      data:{      //上传时附带的额外参数object
        type: Object
      },
      validatorCallback:{
        type: Function
      }
    },
    data() {
      return {
        drageStyle:false,  //拖入样式
        fileList:[],
        reqFileList:null,

        fileData:{
          files:[],
          base64:null,
        }
      }
    },
    mounted(){

    },
    methods: {
      // 点击逻辑
      onClick(){
        let file = this.$refs.file
        file.value = ''
        file.click()
      },
      // 拖拽逻辑
      drop(event){
        if(this.disabled || !this.drag) return;
        this.drageStyle = false
        //获取文件对象
        let fileList = Array.from( event.dataTransfer.files )
        let acceptArr  = this.accept.split(',')
        this.fileList = fileList.filter(item=>{
          return acceptArr.indexOf(item.type)>=0
        })
        // 不支持多选逻辑
        !multiple && this.fileList.length > 0 && (this.fileList = this.fileList[0])

        this.getFliteFn( this.fileList )
      },
      dragleave(){
        if(this.disabled || !this.drag) return;
        this.drageStyle = false
      },
      dragenter(){
        if(this.disabled || !this.drag) return;
        this.drageStyle = true
      },

      // input 逻辑
      inputGetfile(event){
        this.fileList = Array.from( event.target.files )
        this.getFliteFn( this.fileList )
      },

      // 钩子函数区
      async getFliteFn(fl = this.fileList){
        this.$emit('change',fl)
        if(typeof this.validatorCallback === 'function'){
          await this.validatorFileFn()
        }
        if(this.autoUpload && this.action){
          this.submit()
        }
      },

      validatorFileFn(fl = this.fileList){
        // 利用callback获取，验证后的数据
        return new Promise((resolve,reject) => {
          this.validatorCallback(fl,(callbackFliteListData)=>{
            try {
              this.reqFileList = callbackFliteListData
              resolve()
            } catch (error) {
              reject()
            }
          })
        })
      },
      submit(){
        console.log(4);

      }
      

      // avatarUploader(event){ // 图片上传
      //   let files = event.target.files;
      //   if(!files[0]){ return }
      //   let mType = files[0].type;
      //   if(files.length > 0){
      //     this.fileData.files = files[0];
      //     // 获取 base64
      //     let reader = new FileReader();
      //     reader.readAsDataURL(files[0]);
      //     reader.onload = (e)=> {
      //       let base64 = e.target.result;
      //       this.fileData.base64 = base64;
      //       // 图片信息
      //       if(mType.indexOf("image")>=0){
      //         let media = new Image();
      //         media.src = base64;
      //         media.onload=()=>{
      //           this.fileData.imgData = {
      //             base64:base64,
      //             width:media.width,
      //             height:media.height,
      //             name: this.fileData.files.name,
      //             size: this.fileData.files.size,
      //             type: this.fileData.files.type
      //           } 
      //           media=null;
      //           this.$emit('onchange',this.fileData)
      //         }
      //         media.onerror=()=>{image=null}
      //       }else{
      //         this.$emit('onchange',this.fileData) // 显然不是图片文件
      //       }
      //     }
          
      //   }
      // }
    },
    computed: {},
    watch:{
    }

  }
</script>


<style scoped lang="scss">
  $pcolor : #409EFF;
  $color_main: #409EFF;

  
  #drop_area{
    box-sizing: border-box;
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    width: 360px;
    height: 180px;
    text-align: center;
    position: relative;
    overflow: hidden;
    cursor: pointer;;
    &:hover{
      border: 1px dashed $pcolor;
    }
  }

  #drop_area.disabled{
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
  #drop_area.drage{
    border: 2px dashed $pcolor;
    background-color: #409eff2e;

  }




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
