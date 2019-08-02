<template>
  <div>
    <h1>SUpload - 文件上传</h1>
    <div>
      <SUpload 
        action="http://10.130.151.60:80/upload/"
        :getFile="getFilefn"
        :beforeUpload="beforeUploadfn"

        :data="{a:1,b:2}"
        
        :oneByOne="false"
      >

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
    getFilefn(fl){
      return new Promise(function(resolve, reject){
        setTimeout(()=>{
          resolve()
        },1000)
      })
    },
    beforeUploadfn(i){
      return new Promise(function(resolve, reject){
        console.log('ppppppppppp')
        setTimeout(()=>{
          resolve()
        },1000)
      })
    }
  }
}
</script>

