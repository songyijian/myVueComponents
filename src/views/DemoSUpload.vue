<template>
  <div>
    <h1>SUpload - 文件上传</h1>
    <div>
      <SUpload 
        :accept="accept"
        action="http://10.130.151.60:80/upload/"
        @validatorCallback="validatorfn"
        :data="{a:1}"
      >

        :drag="false"
        action="https://jsonplaceholder.typicode.com/posts/"
        :disabled="true"
        <p>将文件拖拽到此区域;</p>
        <p>image/gif,image.jpeg,image/png,video/mp4</p>
      </SUpload>
    </div>
  </div>
</template>


<script>
import SUpload from '~contol/SUpload'

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
    validatorfn(fl,callback){
      alert(1)
      // setTimeout(()=>{
      //   callback(
      //     fl.map(item=>{
      //       return item
      //     })
      //   )
      // },2000)
    }
  }
}
</script>

