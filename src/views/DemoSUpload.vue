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
      >

      :uploadProgress="progress"
      :oneByOne="false"
        @validatorCallback="validatorfn"
        :accept="accept"
        :drag="false"
        :disabled="true"
        <p>将文件拖拽到此区域;</p>
        <p>image/gif,image.jpeg,image/png,video/mp4</p>
      </SUpload>
    </div>
  </div>
</template>


<script>
import SUpload from '~contol/SUpload'
import { Promise } from 'q';

export default {
  components: {SUpload},
  name: 'DemoSUpload',
  data(){
    return({
      accept:'image/gif,image/jpeg,image/png,video/mp4'
    })
  },
  mounted(){},
  methods:{

    //获取文件
    getFilefn(fl){
      console.log(fl);

      return new Promise(function(resolve, reject){
        if(fl.length>2){
          alert('>2')
          reject()
        }else{
          resolve()
        }
      })
    },

    // 上传前
    beforeUploadfn(i){
      return new Promise(function(resolve, reject){
        if(i.type.indexOf('mp4')>=0){
          alert('不能上传mp4文件！');
          reject()
        }else {
          resolve()
        }

      })
    },

    // 进度
    progress(t,file){
      console.log(`${file.name} : `,t)
    },

    success(res,file){
      console.log(`${file.name} - 长传成功 : `,res)
    },

    error(res,file){
      console.log(`${file.name} - 长传失败 : `,res)
    },

  }
}
</script>
