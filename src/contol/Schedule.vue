/**
 * @Description: 小时周期控件
 * @Author: yijian.song
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-05 13:42:24
 * @LastEditTime: 2019-07-30 10:50:11

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
*/


<template lang="html">
  <div class="schedule_box">
    <input type="hidden" :value="value" >
    <div :class="{'read_only':!disabled}" :style="{'width':`${(tdSize*24)+dayWidth}px`,'min-height':`${tdSize*7 + timeHeight + flterHeight}px` }" >
      <div class="time_title_box" :style="{ 'margin-left': dayWidth+'px','height':timeHeight+'px'}">
        <span v-for="item,index in time" :key="'t'+index" :data-index="index" @click="timeTitle(index)" :style="{'width':`${tdSize}px`,'line-height':timeHeight+'px'}">{{item}}</span>
      </div>
      <div class="schedule_body_box">
        <div class="day_title_box" :style="{ 'width': dayWidth+'px' }">
          <span v-for="item,index in day" :key="item" @click="dayTitle(index)" :style="{'height':`${tdSize}px`,'line-height': `${tdSize}px`}">{{item}}</span>
        </div>
        <div ref="time_bloack_box" class="time_bloack_box" @mousedown="down($event)" @mouseup="up($event)" @mousemove="move($event)">
          <div v-for="(itemf,indexf) in nowStatueArray" :key="'f'+indexf" :style="{height: `${tdSize}px`}" >
            <span v-for="(item,index) in itemf"
                  :style="{'width':`${tdSize}px`,'height':`${tdSize}px`}"
                  :key=" 'c'+index + indexf "
                  :class="{'schedule_time_item_yes':item==1}">{{index}}
            </span>
            <i v-for="(item,index) in txtShowStatue[indexf]" :style="{'height':`${tdSize}px`,'line-height': `${tdSize}px`,'width':`${item.length*tdSize}px`,'left':`${item.start*tdSize}px`}">
              {{item.length==24 ? '全天投放' : `${item.start}:00 - ${item.end+1}:00`}}
            </i>
          </div>
          <em class="move_bg" :style="[moveBgData]"></em>
        </div>
      </div>
      <div class="schedule_flter_box" :style="{ 'height': flterHeight+'px','line-height':flterHeight+'px'}">
        <div class="flter_btn_box">
          快速设定：<span @click="dayTf('all')">全周投放</span>
          <span @click="dayTf('restDay')">周一到周五投放</span>
          <span @click="dayTf('workingDay')">周末投放</span>
        </div>
        <div class="flter_msg_box">
          <span><i class="play_b"></i> 投放时间段 </span>
          <span><i class="stop_b"></i> 暂停时间段 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

/**
 * v 2019.07.30 修复末尾错误
 *
 * 找出单层数组，重复值的始末位置
 * @param {Array} arr
 * @param {string | number} val 筛选样本
 * @param {number} keep 连续重复位数 注意：别他妈给我个1，一位算重复吗？
 * @return {Array}
 *  RepeatBit([1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1], 1, 2)
 *      >[{"val":1,"length":3,"start":0,"end":2},{"val":1,"length":4,"start":5,"end":8},{"val":1,"length":2,"start":14,"end":15}]
 */

function RepeatBit(arr, val, keep = 3) {
  if (!Array.isArray(arr)) { return Error('参数必须是合法数组') }
  if (typeof val === 'undefined') { return Error('重复参考样本不能为空') }
  var start = arr.length + 1,
      m = [],
      setState = function (index) {
        if (index - start >= keep) {
          m.push({
            val: val,
            length: index - start,
            start: start,
            end: (index - 1)
          })
        }
        start = arr.length + 1
      };
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      if (start > i)start = i;
      // 最后一位差异处理
      if ((i == arr.length - 1) && (i - start >= keep - 1)) {
        m.push({
          val: val,
          length: (i+1 - start),
          start: start,
          end: i
        })
        start = arr.length + 1
      }
    } else {
      if (i - start >= keep) {
        m.push({
          val: val,
          length: i - start,
          start: start,
          end: (i - 1)
        })
      }
      start = arr.length + 1
    }

  }
  return m
}


export default {
  name: 'Schedule',
  props:{
    change:{type:Function},
    val:{
      type:Array,
      required:true,
      validator(val) {
        return Array.isArray(val) && val.every(item=>item===0||item===1) && val.length === 168
      }
    },
    tdSize:{
      type: Number,
      default: 30,
      validator(val) {
        return val >= 16
      }
    },
    dayWidth:{
      type: Number,
      default: 50
    },
    timeHeight:{
      type: Number,
      default: 30,
      validator(val) {
        return val >= 16
      }
    },
    flterHeight:{
      type: Number,
      default: 30,
      validator(val) {
        return val >= 16
      }
    },
    disabled:{
      type: Boolean,
      default: true
    }
  },
  data:function(){
    return ({
      moveBgData:{display: 'none'},
      time:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      day:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      I : Array(24).fill(1),
      C : Array(24).fill(0),
      nowStatueArray:[]
    })
  },
  mounted(){
    window.onmouseup = (ev)=>{
      if(this.downOff){
        this.mousefn(ev)
        this.downOff = false
      }
    }
  },
  created(){
    if(this._validatorOriginVal()) this.initSetStatueArray()
  },
  methods:{
    /** 校验传入参数 */
    _validatorOriginVal (val = this.val) {
      return Array.isArray(val) && val.every(item=>item===0||item===1) && val.length === 168
    },
    /** 把传入数据处理成可以使用到对象 */
    initSetStatueArray (arr = this.val) {
      let arry7_24 = [],n=0;
      for(let i=0; i<7; i++){
        var a24 = arr.slice(n,n+24)
        arry7_24.push( a24 )
        n+=23
      }
      this.nowStatueArray = arry7_24
    },
    /** 24小时快速选择 */
    timeTitle(index){
      if(!this.disabled){ return}
      var narr = []
      var garr = this.nowStatueArray.map(item=>item[index])
      this.nowStatueArray.forEach((item,i)=>{
        if(garr.indexOf('0')>= 0 || garr.indexOf(0)>= 0){
          this.$set(this.nowStatueArray[i],index,1 )
        }else{
          this.$set(this.nowStatueArray[i],index,0 )
        }
      })
    },
    /** 星期1～7快速选择 */
    dayTitle(index){
      if(!this.disabled){ return}
      if(this.nowStatueArray[index].indexOf('0')>= 0 || this.nowStatueArray[index].indexOf(0)>= 0){
        this.$set(this.nowStatueArray,index,[...this.I])
        return
      }
      this.$set(this.nowStatueArray,index,[...this.C])
    },
    /** 快速设置按钮方案： */
    dayTf(n){
      if(!this.disabled){ return}
      switch (n) {
        case 'all':
          //全部投放
          this.nowStatueArray.forEach((item,index)=>{
            this.$set(this.nowStatueArray,index,[...this.I])
          })
          break;
        case 'restDay':
          //周一到周五投放
          this.nowStatueArray.forEach((item,index)=>{
            if(index < 5 ){
              this.$set(this.nowStatueArray,index,[...this.I])
            }else{
              this.$set(this.nowStatueArray,index,[...this.C])
            }
          })
          break;
        default:
        //休息日投放
        this.nowStatueArray.forEach((item,index)=>{
          if(index < 5 ){
            this.$set(this.nowStatueArray,index,[...this.C])
          }else{
            this.$set(this.nowStatueArray,index,[...this.I])
          }
        })
      }
    },
    /** 鼠标选择方案 框选 + 点击 */
    down(ev){
      if(!this.disabled){ return}
      // 开锁
      this.downOff = true;
      this.scrollTop = document.body.scrollTop ||  document.documentElement.scrollTop;
      this.scrollLeft = document.body.scrollLeft ||  document.documentElement.scrollLeft;
      this.boxData = this.$refs.time_bloack_box.getBoundingClientRect();
      let y = ev.pageY-this.boxData.y - this.scrollTop;
      let x = ev.pageX-this.boxData.x - this.scrollLeft;
      this.downData = { y, x };
      // 鼠标位于bg磁性坐标于的偏移量
      this.dowBgDval = {
        top: y % this.tdSize,
        left: x % this.tdSize,
        bottom:this.tdSize - ( y % this.tdSize),
        right:this.tdSize - ( x % this.tdSize),
      }
      this.moveBgData = {
        top: ( y - this.dowBgDval.top) + 'px',
        left: (x - this.dowBgDval.left) + 'px',
        width:this.tdSize + 'px',
        height:this.tdSize + 'px',
        display:'inline-block'
      }
    },
    move(ev){
      if(!this.disabled){ return}
      /** 鼠标移动 (不会存在 yl === 0 ；xl === 0 的清空) */
      if(this.downOff){
        //移动坐标处理
        let y = ev.pageY - this.boxData.y - this.scrollTop;
        let x = ev.pageX - this.boxData.x - this.scrollLeft;
        //移动距离 + | -
        let yl = y - this.downData.y;
        let xl = x - this.downData.x;
        //移动 【绝对】 距离
        let ylAbs = Math.abs( yl );
        let xlAbs = Math.abs( xl );

        // 变量抽离
        let top = ( this.downData.y - this.dowBgDval.top) + 'px';
        let left = ( this.downData.x - this.dowBgDval.left) + 'px';
        let w = this.tdSize + 'px'
        let h = this.tdSize + 'px'

        /** 顺势框选
            yl > 0  向下移动鼠标
            xl > 0  向右滑动
        */
        if(yl > 0){
          if(y > this.downData.y + this.dowBgDval.bottom ){ // 有效移动
             if(y < this.downData.y + this.dowBgDval.bottom + this.tdSize){
               //移动到下一格范围，但实距离<1个单元格距离
               h = this.tdSize*2 + 'px'
             }else{
               //已经达到通过移动单元格距离来计算宽度： h = 实际距离/格子宽度 + 半个磁性偏移量
               h = ( Math.ceil( (yl - this.dowBgDval.bottom)/this.tdSize ) + 1)*this.tdSize +'px'
             }
          }
        }

        if(xl > 0){
          if(x > this.downData.x + this.dowBgDval.right ){ // 有效移动
             if(x < this.downData.x + this.dowBgDval.right + this.tdSize){
               w = this.tdSize*2 + 'px'
             }else{
               w = ( Math.ceil( (xl - this.dowBgDval.right)/this.tdSize ) + 1) * this.tdSize +'px'
             }
          }
        }

        /** 逆势框选   */
        if(yl < 0){
          if(y < this.downData.y - this.dowBgDval.top ){ // 有效移动
             if(y > this.downData.y - this.dowBgDval.top - this.tdSize){
               h = this.tdSize * 2 + 'px'
             }else{
               h = ( Math.ceil( (ylAbs - this.dowBgDval.top)/this.tdSize ) + 1)*this.tdSize +'px'
             }
             top = Math.floor(y/this.tdSize)*this.tdSize + 'px'
          }
        }
        if(xl < 0){
          if(x < this.downData.x - this.dowBgDval.left ){ // 有效移动
             if(x > this.downData.x - this.dowBgDval.left - this.tdSize){
               w = this.tdSize * 2 + 'px'
             }else{
               w = ( Math.ceil( (xlAbs - this.dowBgDval.left)/this.tdSize ) + 1)*this.tdSize +'px'
             }
             left = Math.floor(x/this.tdSize)*this.tdSize + 'px'
          }
        }
        this.moveBgData = {
          top:top,
          left:left,
          width: w,
          height:h,
          display:'inline-block'
        }
      }
    },
    up(ev){},
    mousefn(){
      if(!this.disabled){ return}
      /** 鼠标点击框下 处理函数*/
      var dayStart = (parseInt(this.moveBgData.top) / this.tdSize); //天数组索引 start
      var dayEnd = parseInt(this.moveBgData.height)/ this.tdSize + dayStart -1 ; //天数组索引 end
      var timeStart = (parseInt(this.moveBgData.left)/ this.tdSize);//小时数组（子）索引 start
      var timeEnd = parseInt(this.moveBgData.width)/ this.tdSize + timeStart-1;  //小时数组（子）索引 end
      for(var i = dayStart; i<=dayEnd; i++){
        let d = this.nowStatueArray[i];
        for(var e = timeStart; e<=timeEnd; e++){
          this.$set(this.nowStatueArray[i],e,d[e]==1 ? 0 : 1)
        }
      }
      this.moveBgData = { display:'none' }
    }
  },
  computed:{
    txtShowStatue:function () {
      let txtShowArray = []
      this.nowStatueArray.forEach(item=>{
        txtShowArray.push(RepeatBit(item,1))
      })
      return txtShowArray
    },
    value:function () {
      let getv = []
      this.nowStatueArray.forEach((item)=>{
        getv.push(...item)
      })
      return getv
    }
  },
  watch:{
    'nowStatueArray':function (newQuestion, oldQuestion) {
      this.$emit('change',this.value)
    },
    'val':function(newData,oldData) {
       if(newData.toString()!==oldData.toString()){
         if(this._validatorOriginVal()){
           this.initSetStatueArray()
         }else{
           Error('“val” 必须是只包含1|0的168位数组')
         }
       }
    }
  }
}
</script>

<style lang="scss">
  $color:#409eff;
  $color_tiem_txt_bg:rgba(64, 158, 255,0.7);
  $color_ccc:#bcc6d0;
  .schedule_box{padding:8px; background:#f5f5f5db; display: inline-block; position: relative; overflow: hidden;  box-sizing:content-box;color: #1f2d3d;
    -moz-user-select: -moz-none; -moz-user-select: none; -o-user-select:none; -khtml-user-select:none; -webkit-user-select:none; -ms-user-select:none; user-select:none; }
  .schedule_box *{ box-sizing: border-box; margin: 0; padding: 0}
  /* 0~24 */
  .time_title_box{  font-size: 0; }
  .time_title_box>span{font-size: 13px; display: inline-block; text-align: center; border: 1px solid #eaeefb; line-height: 20px}
  /* 主体 */
  .schedule_body_box{ overflow: hidden; font-size: 0;}
    /* 周 1～7 */
    .day_title_box{ display: flex; float: left;flex-flow:column nowrap; text-align:center; }
    .day_title_box>span{font-size: 13px; border: 1px solid #eaeefb; }
    /* 块 */
    .time_bloack_box{ float: left; position: relative;}
    .time_bloack_box span{font-size: 0; height: 25px;display: inline-block; border: 0.5px solid $color_ccc; background: #e9e8ec}
    .time_bloack_box .schedule_time_item_yes{background-color: $color;}
    .time_bloack_box>div{ position: relative;}
    .time_bloack_box>div>i{display:inline-block; position: absolute; top: 0; font-size: 13px !important; font-weight: bold; top: 0; text-align: center; color: #fff; background:$color_tiem_txt_bg;}
    .time_bloack_box>div>i:hover{ font-size: 0; background: 0; height:0}
    em.move_bg{ background:rgba(0,0,0,0.6); position: absolute; display: none; z-index: 2;}
  /* 脚 */
  .schedule_flter_box{font-size: 13px; overflow: hidden;}
  .schedule_flter_box>div{font-size: 13px; display: inline-block;}
  .schedule_flter_box>*:nth-child(n){font-size: 13px; display: inline-block;}
  .flter_msg_box{float: right; vertical-align: baseline; overflow: hidden; line-height:inherit;}
  .flter_msg_box span{ margin-left: 0.5rem;}
  .flter_msg_box i{ display:inline-block;margin-bottom: -3px; height: 17px; width:17px; border:0.5px solid $color_ccc;}
  .stop_b{background: #e9e8ec;}
  .play_b{background: $color;}
  .flter_btn_box{float: left; line-height:inherit;}
  .flter_btn_box>span{
    display: inline-block;line-height: 0.8;white-space: nowrap;background: #fff;border: 1px solid #dcdfe6; border-color: #dcdfe6;-webkit-appearance: none;text-align: center;box-sizing: border-box;outline: none;margin-right:0.25rem;font-weight: 500;padding:0.25rem;font-size: 13px;border-radius: 4px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  .time_title_box>span,.flter_btn_box>span,.day_title_box>span,.time_bloack_box{ cursor: pointer; background: #fff;}
  .time_title_box>span:hover,
  .day_title_box>span:hover,
  .flter_btn_box>span{color: $color;background: #ecf5ff;border-color: #b3d8ff;}
  .flter_btn_box>span:hover{ color: #fff; background-color: $color; border-color: $color;}
  /* 只读 */
  .schedule_box .read_only{opacity: 0.6; pointer-events: none; cursor: not-allowed !important; }
</style>
