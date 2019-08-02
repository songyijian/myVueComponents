<!--
 * @Description: 上传控件
 * @Author: yijian.song
 * @Date: 2019-07-29 19:37:08
 * @LastEditTime: 2019-08-02 19:57:05
 * @LastEditors: Please set LastEditors

accept 属性接受一个逗号分隔的 MIME 类型字符串, 如:
  accept="image/png" or accept=".png" — 只接受 png 图片.
  accept="image/png, image/jpeg" or accept=".png, .jpg, .jpeg" — PNG/JPEG 文件.
  accept="image/*" — 接受任何图片文件类型. 
  accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" — 接受任何 MS Doc 文件类型.
 -->

<template lang="html">
  <div>
    <div id="drop_area" @click="onClick" :class="{'disabled':disabled, 'drage':drageStyle}"
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
	  <div id="preview"></div> 
  </div>
</template>

<script lang="js">
  function isPromise(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
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
        default:''
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
      getFile:{
        type: Function
      },
      beforeUpload:{    //发送前钩子
        type: Function
      }
    },
    data() {
      return {
        drageStyle:false,  //拖入样式
        fileList:[],
        // filesStaus:[        //文件的上传状态
        //   // {
        //   //   file:,        //文件对象
        //   //   status:,      //0=未开始，1=上传中，2=上传完成 -1=上传失败 -2=本次上传被跳过
        //   //   Progress:0,   //进度0～100
        //   // }
        // ] 
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
        this.drageStyle = false
        //获取文件对象
        let fileList = Array.from( event.dataTransfer.files )
        // 格式校验，未完成。。。
        let acceptArr  = this.accept.split(',')
        this.fileList = fileList.filter(item=>{
          return acceptArr.indexOf(item.type)>=0
        })
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
        console.log(1)
        /**
        * @Description: getFile属性支持返回值
        * @return: {promise} 
        *   promise ：里面有异步逻辑的时候非常有用
        *            resolve([])继续 ,【fileList】可返回重置文件列表（剔除、添加）
        *            reject 终止后续动作
        */
        if(typeof this.getFile !== 'function'){
          console.log(2);
          this.submit(); 
          return
        }
      
        try {
          await this.getFile(fl).then(data=>{
            console.log(2,'可以重置，文件列表')
            typeof data !=='undefined' && Array.isArray(data) && (this.fileList = data)
            if(this.autoUpload && this.action){
              this.submit()
            }
          }).catch(data=>{
            console.log('Promise','终止...')
          })
        } catch (error) {
          throw `getFile 返回值必须是 Promise！\n ${error}`
        }
      },

      // 触发上传
      // submit(){
      //   console.log(3);
      //   this.uploadEvent()
      // },

      async submit(){
        console.log(4);
        // 参数整理
        const setFormData = (filesObj)=>{
          try {
            let sfile = Array.isArray(filesObj) ? filesObj :[filesObj]
            let formdata = new FormData()
            sfile.forEach(element => {
              formdata.append(element.name || 'file',element) //应该分拆成过个文件一起上传
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
          console.log(4.1,typeof this.beforeUpload)
          for(i; i<ls; i++){
            if(typeof this.beforeUpload !== "function"){ 
              // 发送逻辑
              this.http(setFormData(fs[i]))
              return 
            }
            let lock = null //循环锁
            try {
              await this.beforeUpload(fs[i]).then(data=>{
                lock = true
              }).catch(data=>{
                lock = data === "break" ? data :false
              })
              if(lock===false){ continue;return } //跳出本次循环
              if(lock==='break'){ break;return } //循环直接跳出
            } catch (error) {
              throw `beforeUpload 返回值必须是 Promise！\n ${error}`
              continue;
            }

            this.http(setFormData(fs[i]))
          }

        }else{
          if(typeof this.beforeUpload !== "function"){ 
            // 发送逻辑
            this.http(setFormData(fs))
            return 
          }
          try {
            await this.beforeUpload(fs).then(data=>{
              this.http(setFormData(fs))
            })
            .catch(data=>{
              if(data==='break'){}
            })
          } catch (error) {
            throw `beforeUpload 返回值必须是 Promise！\n ${error}`
          }
        }

      },

      // 上传方法
      http(data){
        console.log('http:' + 5);
        if(axios){
          let self = this
          let config = {
              onUploadProgress: ev => {
                let complete = (ev.loaded / ev.total * 100 | 0)
                this.uploadProgress(complete,data,ev.loaded, ev.total)
              },
              headers: {
                'Content-Type': 'multipart/form-data'
              }
          }
          axios.post(this.action,data,config).then(res=>{
            if (res.status == 200) {
              this.uploadSuccess(data,res)
            } else {
              this.uploadError(data,res)
            }
          })

        }else{
          new Promise(function(resolve, reject){
            var xhr = new XMLHttpRequest();
            xhr.open("POST", this.action, true);
            xhr.onload = (evt) =>{
              if (xhr.status == 200) {
                this.uploadSuccess(data,evt.target.responseText)
              } else {
                this.uploadError(data,evt.target.responseText)
              }
            }
            // 获取上传进度
            xhr.upload.onprogress = (event)=>{
              if (event.lengthComputable) {
                let complete = Math.floor(event.loaded / event.total * 100)
                this.uploadProgress(complete,data,event.loaded, event.total)
              }
            }
            xhr.send(data);
          })
        }

      },
      /**
       * @Description: 上传进度回调
       * @param {Number}  step    0~100
       * @param {obj}     file    当前文件
       * @param {type}    loaded  上传了多少
       * @param {type}    total   总量 
       */
      uploadProgress(step,file,loaded,total){
        console.log(step)
      },
      /**
       * @Description: uploadSuccess 、uploadError
       * @param {file}  file 当前文件
       * @param {res}  res 当前文件
       */
      uploadSuccess(file,res){
        alert('2222')
        console.log(file,res)
      },
      uploadError(file,res){
        alert('000')
        console.log(file,res)
      }

    },
    computed: {},
    watch:{ }

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
</style>