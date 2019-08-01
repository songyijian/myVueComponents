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

api

* 钩子函数

  //获取文件，拖拽已把不符合剔除
  :getFile(fileList)



  //验证阶段（符合accept的文件list），可以进一步校验剔除你不想要的
  //这是个用属性传入的func
  :validatorCallback(fileList,callbackFn)   

  // 上传执行函数，可以被动调用执行上传动作
  @submit



* 条件配置

  // 是否多次提交
  oneByOne = "true"    //true=一个接一个 | false=一起性上传
  //Together

  // 是否主动上传
  autoUpload = "true"  

  //上传地址,为空时不会执行任何上传动作
  action = '*/*'

  // 是否选择多文件,false = drag下选择符合（accept属性的）的第一个
  multiple = "true"

  // 不可编辑
  disabled = "false"  
  //
  drag

```


