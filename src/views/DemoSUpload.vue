<template>
  <div>
    <h1>SUpload - 文件上传</h1>
    <div>
      <SUpload
        action="http://localhost:80/upload/"
        :getFile="getFilefn"
        :beforeUpload="beforeUploadfn"
        :data="{a:1,b:2}"
        :uploadSuccess="success"
        :uploadError="error"
        :uploadProgress="progress"
      >
        <p>将文件拖拽到此区域;</p>
        <p>image/gif,image.jpeg,image/png,video/mp4</p>
      </SUpload>

      <ul v-if="fls">
        <li v-for="(value, key, index) in fls">
          <img :src="value.imgUrl" alt="">
          <p>
            {{key}} - {{value.uploadProgress}} - {{value.status==0? '未完成' : '完成'}}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import SUpload from '~contol/SUpload'
import { Promise } from 'q';

function getObjectURL(file) {
    var url = null;
    if (window.createObjcectURL != undefined) {
        url = window.createOjcectURL(file);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

export default {
  components: {SUpload},
  name: 'DemoSUpload',
  data(){
    return({
      accept:'image/gif,image/jpeg,image/png,video/mp4',
      fls:null
    })
  },
  mounted(){},
  methods:{

    //获取文件
    getFilefn(fl){
      console.log('获取文件',1);
      return new Promise((resolve, reject)=>{
        if(fl.length>3){
          alert('上传不应超过10个')
          reject()
        }else{
          let filesObj = {}
          fl.forEach(item=>{
            let k = item.name
            filesObj[k] = ({
              imgUrl:getObjectURL(item),
              uploadProgress:0,
              status:0,
              imgName:item.name,
              file:item,
            })
          })
          this.fls = filesObj
          resolve()
        }
      })
    },

    // 上传前
    beforeUploadfn(file){
      console.log('获取文件',2);
      return new Promise(function(resolve, reject){
        if(Array.isArray(file)){
          console.log('one by one')
          if (file.size >1204*5) {
            console.log('文件过大')
            reject()
          }else {
            resolve()
          }
        }else{
          resolve()
        }
      })
    },

    // 进度
    progress(t,file){
      console.log(`${file.name} : `,t)
      this.fls[file.name].uploadProgress=t
    },

    success(res,file){
      this.fls[file.name].status=1
      console.log(`${file.name} - 长传成功 : `,res)
    },

    error(res,file){
      console.log(`${file.name} - 长传失败 : `,res)
    }

  }
}
</script>
<style media="screen">
  img{ height: 100px}
</style>
