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

### Schedule
> 周期小时粒度快选组建
```
周期小时粒度快选组建
1.支持框选  2.点选  3.列选 +反选  4.周1～7行选 + 反选

<Schedule @onchange="fn" :tdSize="30" :setType="true" :originVal="[]" />
  :originVal="[]"   #必须是只包含1|0的168位数组 (1选，2未选)*
  @onchange="fn"    #修改监听函数fn(val)
  :tdSize="30"      #每个格子的大小(px)，最小16
  :setType="true"   #是否可编辑
  :timeHeight="30"  #0-23小时列快速选择按钮高度(px)
  :dayWidth="50"    #周1-7行速选择按钮宽度(px)，高度是根据tdSize算出来的

历史版本

* v 20190718 / 硬核bug修复，tdsize设置最小值，originVal校验规则修改（错了自行检查不做提示）
* v 20180727
```



#### SpuerChart
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
