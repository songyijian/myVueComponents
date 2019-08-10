<!--
 * @Description: 上传控件
 * @Author: yijian.song
 * @Date: 2019-07-29 19:37:08
 * @LastEditTime: 2019-08-06 10:56:31
 * @LastEditors: Please set LastEditors

 <SUpload
  :disabled="false"     //不可编辑（默认false可编辑）
  :drag="true"          //是否可拖拽（默认true可拖拽）
  :multiple="true"      //多文件上传（默认true）
  :accept=""            //上传文件类型，只支持image/png,video/mp4写法
  :directory="false"    //选择文件夹
  :action=""            //上传地址(空不会调用submint)
  :autoUpload="true"    //获取文件主动上传（action不存在无效）
  :oneByOne="true"      //多文件多次上传(false多个文件一次性上传)
  :data=""              //上传时附带的额外参数{key:val},key=val
>
  <p>插槽</p>
</SUpload>
 -->

<template lang="html">
<div class="drop_area" @click="onClick" :class="{'disabled':disabled, 'drage':drageStyle}"
   @drop.prevent="drop($event)"
   @dragleave.prevent="dragleave($event)"
   @dragenter.prevent="dragenter($event)"
   @dragover.prevent
  >
    <input type="file" ref="file" style="display:none"
      :webkitdirectory="directory"
      @change="inputGetfile($event)"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept">
    </input>
    <slot></slot>
</div>
</template>

<script lang="js">
  function isFile(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'File'
  }

  export default {
    name: 'SUpload',
    components: {},
    props: {
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
        default:'',
        validator(str){
          return typeof str==='string' && !(str.indexOf('*') >= 0) && !(str.indexOf('.') >= 0)
        }
      },
      directory:{     //选择文件夹（下面的文件都会被纳入）,true其他文件不能被选择
        type: Boolean,
        default:false
      },
      action:{        //上传地址
        type: String,
        validator(str){
          return typeof str==='string' && str.indexOf('/') >= 0
        }
      },
      autoUpload:{    //主动上传
        type: Boolean,
        default:true
      },
      oneByOne:{      //是否多次提交
        type: Boolean,
        default:true
      },
      data:{          //上传时附带的额外参数object
        type: Object,
        default:null
      },
      getFile:{         //获取文件钩子
        type: Function
      },
      beforeUpload:{    //发送前钩子
        type: Function
      },
      uploadProgress:{    //进度
        type: Function
      },
      uploadSuccess:{    //成功
        type: Function
      },
      uploadError:{    //失败
        type: Function
      },
      fileKey:{
        type: String
      }
    },
    data() {
      return {
        drageStyle:false,  //拖入样式
        fileList:[]
      }
    },
    mounted(){ },
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
        this.drageStyle && (this.drageStyle = false)
        let fileList = Array.from( event.dataTransfer.files )
        // 格式校验，未完成。。。
        if(this.accept.length>1){
          let acceptArr  = this.accept.split(',')
          this.fileList = fileList.filter(item=>{
            return acceptArr.indexOf(item.type)>=0
          })
        }
        // 不支持多选逻辑
        !this.multiple && this.fileList.length > 0 && (this.fileList = this.fileList[0])
        this.getFileFn()
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
        this.getFileFn()
      },

      // 钩子函数区
      async getFileFn(fl = this.fileList){
        // console.log(1);
        /**
        * @Description: getFile属性支持返回值
        * @return: {promise}
        *   promise ：里面有异步逻辑的时候非常有用
        *            resolve([])继续 ,【fileList】可返回重置文件列表（剔除、添加）
        *            reject 终止后续动作
        */
        if(typeof this.getFile !== 'function'){
          (this.autoUpload && this.action) && this.submit()
          return
        }

        try {
          await this.getFile(fl).then(data=>{
            if(typeof data !=='undefined' && Array.isArray(data)){
              data.forEach(f=>{
                if(!isFile(f)) throw 'getFile返回的文件列表不合法！'
              })
              this.fileList = data
            }
            (this.autoUpload && this.action) && this.submit()
          }).catch(data=>{
            // console.log('Promise 终止...')
          })
        } catch (error) {
          throw `getFile返回值必须是Promise | 返回值内部错误\n ${error}`
        }
      },


      // 触发上传
      async submit(){
        // console.log(2);
        // 参数整理
        const setFormData = (filesObj)=>{
          try {
            let sfile = Array.isArray(filesObj) ? filesObj :[filesObj]
            let formdata = new FormData()
            sfile.forEach(element => {
              formdata.append( this.fileKey || element.name,element) //应该分拆成过个文件一起上传
            })
            if(this.data){
              for (const key in this.data) {
                if (this.data.hasOwnProperty(key)) {
                  const element = this.data[key]
                  formdata.append(key,element)  //分拆成多个key：vale
                }
              }
            }
            return formdata
          } catch (error) {
            throw '参数组成formData时产生错误！'
          }
        }

        var fs = this.fileList
        if(this.oneByOne){
          let ls = fs.length
          let i = 0
          for(i; i<ls; i++){
            if(typeof this.beforeUpload !== "function"){
              this.http(setFormData(fs[i]),fs[i])
              return
            }
            let lock = null //循环锁
            try {
              /**
               * @Description:
               * @param {type}
               * @return: {type}
               * @Author: yijian.song
               * @Date: 2019-08-05 14:59:14
               */
              await this.beforeUpload(fs[i]).then(data=>{
                lock = true
              }).catch(data=>{
                lock = data === "break" ? data :false
              })
              if(lock===false){ continue;return } //跳出本次循环
              if(lock==='break'){ break;return } //循环直接跳出
            } catch (error) {
              throw `beforeUpload返回值不是Promise | 返回值内部错误\n ${error}`
              continue;
            }
            this.http(setFormData(fs[i]),fs[i])
          }

        }else{
          if(typeof this.beforeUpload !== "function"){
            this.http(setFormData(fs),fs)
            return
          }
          try {
            await this.beforeUpload(fs).then(data=>{
              this.http(setFormData(fs),fs)
            }).catch(data=>{})
          } catch (error) {
            throw `beforeUpload 返回值必须是 Promise！\n ${error}`
          }
        }

      },

      // 上传方法
      http(formData,file){
        if(typeof axios !== "undefined"){
          let self = this
          let config = {
              onUploadProgress: ev => {
                let complete = (ev.loaded / ev.total * 100 | 0)
                this.uploadProgressFn(complete,file,ev.loaded, ev.total)
              },
              headers: { 'Content-Type': 'multipart/form-data'}
          }
          axios.post(this.action,formData,config).then(res=>{
            this.uploadSuccessFn(res,file)
          }).catch(res=>{
            this.uploadErrorFn(res,file)
          })

        }else{
          var xhr = new XMLHttpRequest();
          xhr.open("POST", this.action, true);
          xhr.onload = (evt) =>{
            if (xhr.status == 200) {
              this.uploadSuccessFn(file,evt.target.responseText)
            } else {
              this.uploadErrorFn(file,evt.target.responseText)
            }
          }
          // 获取上传进度
          xhr.upload.onprogress = (event)=>{
            if (event.lengthComputable) {
              let complete = Math.floor(event.loaded / event.total * 100)
              this.uploadProgressFn(complete,file,event.loaded, event.total)
            }
          }
          xhr.send(formData);
        }

      },
      /**
       * @Description: 上传进度回调
       * @param {Number}  step    0~100
       * @param {obj}     file    当前文件
       * @param {type}    loaded  上传了多少
       * @param {type}    total   总量
       */
      uploadProgressFn(step,file,loaded,total){
        typeof this.uploadProgress === 'function' && this.uploadProgress(step,file,loaded,total)
      },
      /**
       * @Description: uploadSuccessFn 、uploadErrorFn
       * @param {file}  file 当前文件
       * @param {res}  res 当前文件
       */
      uploadSuccessFn(res,file){
        typeof this.uploadSuccess === 'function' && this.uploadSuccess(res,file)
      },
      uploadErrorFn(res,file){
        typeof this.uploadError === 'function' && this.uploadError(res,file)
      }

    },
    computed: {},
    watch:{ }
  }
</script>

<style scoped lang="scss">
  $pcolor : #409EFF;
  $color_main: #409EFF;
  .drop_area{
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
  .drop_area.disabled{
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .drop_area.drage{
    border: 2px dashed $pcolor;
    background-color: #409eff2e;
  }
</style>
