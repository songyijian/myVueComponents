# 控件整理

### GetFileBase64 上传组建
```
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
```

### GetFileBase64_190416.vue
> 文件上传；获取文件的Base64，图片尺寸大小等信息
```
  <GetFileBase64
    :sizeH="178"            //大小（px）
    :sizeW="178"            //大小（px）
    :multiple="false"       //多文件上传默认false 暂时不支持
    :errTip="xxxxx"         //err展示文字
    :validate=""            //验证状态控制 ‘err’ | ‘suc‘
    :acceptArray="['image/jpeg','image/jpg','image/png']"   //允许上传的文件类型
    :disabled="false"    //禁用
    @onchange="fn"       //fn(fileData:{
                            files:[],
                            base64:null,
                            imgData:{width,height,name,size,type} //上传图片文件才有,多文件为array
                          })
  >
    <img src="" alt="">//这里可以用来显示图片，或者文件字名
  </GetFileBase64>
```


## Schedule - 小时周期控件
```
历史版本
  v 20190814
    修复谷歌页面翻译造成的文字不能正确表示
  v 20190729
    setType改为disabled
    逻辑回滚到v20180727（后悔药>健康）
    算法函数修改
  v 20190718
    硬核bug修复，tdsize设置最小值，originVal校验规则修改（错了自行检查不做提示）
  v 20180727
功能
  1.支持单位框选、点选
  2.行列快选、反选
  3.快捷选择面板
api
  <Schedule @onchange="fn" :tdSize="30" :disabled="true" :originVal="[]" />
    :originVal="[]"     #必须是只包含1|0的168位数组 (1选，2未选)*
    @onchange="fn"      #修改监听函数fn(val)
    :disabled="true"    #是否可编辑
    :tdSize="30"        #每个格子的大小(px) 不<16
    :timeHeight="30"    #0-23小时列快速选择按钮高度(px) 不<16
    :dayWidth="50"      #周1-7行速选择按钮宽度(px) 不<16 [高度是根据tdSize算出来的]
```


#### SpuerChart - 数据可视化图形
>chart.js 的简单封装,参数参考chartjs
```
type , 图标类型 | line
arialabel , 无障碍
options , 事件交互

<SpuerChart/>

  arialabel:{
    type: String,
    default: "无法访问的canvas元素,Your browser does not support the canvas element"
  },
  type:{
    type: String,
    default: "line"
  },
  options:{type: Array,required: true},
  datasets:{ type: Object, required: true },
  labels:{type: Array,required: true}
```


### SUpload - 更灵活的文件上传控件
```
<SUpload
  :disabled="false"     //不可编辑（默认false可编辑）
  :drag="true"          //是否可拖拽（默认true可拖拽）
  :multiple="true"      //多文件上传（默认true）
  :accept=""            //上传文件类型，只支持image/png,video/mp4写法
  :directory="false"    //选择文件夹（默认false不支持,true可以选中文件夹（不能选中文件）会将文件夹下所以文件纳入）
  :action=""            //上传地址(空不会调用submint)
  :autoUpload="true"    //获取文件主动上传（action不存在无效）
  :oneByOne="true"      //多文件多次上传(false多个文件一次性上传)
  :data=""              //上传时附带的额外参数{key:val},key=val
>
  <!-- 插槽 -->
  <p>将文件拖拽到此区域;</p>
  <p>image/gif,image.jpeg,image/png,video/mp4</p>
</SUpload>


钩子（属性函数）

:getFile(fileList)
  /**
    * @Description: 组建读取文件的回调
    * @param {array}      fileList    合法文件列表
    * @return: {Promise}  这个钩子必须返回一个Promise
                          reject()    阻断后续上传等周期活动
                          resolve()   继续后续动作
                          resolve([file]) 可用过传参数重置文件列表,文件会被校验有问题会抛出异常

        getFilefn(fl){
          return new Promise((resolve, reject)=>{
            if(fl.length>3){
              alert('上传不应超过3个')
              reject()
            }else{
              let filesObj = {} //记录上传文件以及状态数据
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
    */


:beforeUpload(files)
  /**
  * @Description: 文件上传前的钩子
  * @param {obj|array}  files     本次发出文件对象，onebyone=fasle为文件列表
  * @return: {Promise}  reject()  阻断本次上传
                        reject('break')  阻断后续所以的上传动作（对onebyone有意义）
                        resolve() 继续上传

      beforeUpload(file){
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
  */


:uploadProgress(step,file,loaded,total)
  /**
  * @Description: 文件上传进度回调函数
  * @param {number}  step    上传进度0～100
  * @param {obj}     file    当前文件
  * @param {type}    loaded  上传了多少
  * @param {type}    total   总量

      progress(t,file){
        console.log(`${file.name} : `,t)
        this.fls[file.name].uploadProgress=t
      },
  */



:uploadSuccess(res,file)
  /**
  * @Description: 成功回调，这里是只状态码200
  * @param {obj}  res   
  * @param {obj}     file    当前文件

    success(res,file){
      this.fls[file.name].status=1
      console.log(`${file.name} - 长传成功 : `,res)
    },
  */



:uploadError(res,file)
  /**
  * @Description: 错误回调，这里是只状态码200
  * @param {obj}  res   
  * @param {obj}     file    当前文件

    error(res,file){
      console.log(`${file.name} - 长传失败 : `,res)
    },
  */



其他：
  被动上传，请调用控件内部submit()
  文件参数：key=文件的name，value=文件
  样式 :style="{border: '5px dashed red'}"

关于上传：
  默认使用axios,（组建内部会检查window.axios是否存在）
  不存在就走内部原生ajax方法



```
