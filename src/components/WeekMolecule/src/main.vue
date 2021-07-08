<!--
 * @Description: WeekMolecule 周小时粒度管理控件
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-07 15:51:39
 * @LastEditors: yijian.song
 * @LastEditTime: 2021-07-09 00:43:52
-->
<template lang="html">
  <div class="schedule_box">
    <!-- {{ fitStatue }} -->
    <input type="hidden" :value="value" />
    <div :class="{ disabledstyle: disabled }" :style="{
        width: `${tdSize * 24 + dayWidth}px`,
      }">
      <div class="time_title_box" :style="{
          'margin-left': dayWidth + 'px',
          height: timeHeight + 'px'
        }">
        <span v-for="(item, index) in time" :key="'t' + index" :data-index="index" @click="timeTitle(index)" :style="{
            width: `${tdSize}px`,
            'line-height': timeHeight + 'px'
          }">
          {{ item }}
        </span>
      </div>
      <div class="schedule_body_box">
        <div class="day_title_box" :style="{ width: dayWidth + 'px' }">
          <span v-for="(item, index) in day" :key="item" @click="dayTitle(index)" :style="{
              height: `${tdSize}px`,
              'line-height': `${tdSize}px`
            }">
            {{ item }}
          </span>
        </div>
        <div ref="time_bloack_box" class="time_bloack_box" @mousedown="down($event)" @mouseup="up($event)"
          @mousemove="move($event)" @mouseleave="leave($event)">
          <div v-for="(itemf, indexf) in fitStatue" :key="'f' + indexf" :style="{ height: `${tdSize}px` }">
            <span v-for="(item, index) in itemf" :style="{
                width: `${tdSize}px`,
                height: `${tdSize}px`
              }" :key="'c' + index + indexf" :class="{ schedule_time_item_yes: item == 1 }">
              {{ index }}
            </span>
            <i v-for="(item, index) in txtShowStatue[indexf]" :style="{
                height: `${tdSize}px`,
                'line-height': `${tdSize}px`,
                width: `${item.length * tdSize}px`,
                left: `${item.start * tdSize}px`
              }">
              {{ item.length == 24 ? "全天投放" : `${item.start}:00 - ${item.end + 1}:00` }}
            </i>
          </div>
          <em class="move_bg" :style="[boxSelectionStyle]"></em>
        </div>
      </div>
      <div class="schedule_flter_box" :style="{
          height: flterHeight + 'px',
          'line-height': flterHeight + 'px'
        }">
        <div class="flter_btn_box">
          快速设定：
          <span @click="dayTf('all')">全周</span>
          <span @click="dayTf('restDay')">周一至周五</span>
          <span @click="dayTf('workingDay')">周六日</span>
        </div>
        <div class="flter_msg_box">
          <span>
            <i class="play_b"></i>
            有效时间
          </span>
          <span>
            <i class="stop_b"></i>
            无效时间
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getRepeat,
    inState,
    undoState,
    copy
  } from "./tools.js";

  export default {
    name: "WeekMolecule",
    props: {
      input: {
        type: Function
      },
      value: {
        type: Array,
        //required: true,
        validator(val) {
          return Array.isArray(val) && val.every(item => item === 0 || item === 1) && val.length === 168;
        },
        default () {
          return Array(24 * 7).fill(0);
        }
      },
      tdSize: {
        type: Number,
        default: 26,
        validator(val) {
          return val >= 16;
        }
      },
      dayWidth: {
        type: Number,
        default: 50
      },
      timeHeight: {
        type: Number,
        default: 30,
        validator(val) {
          return val >= 16;
        }
      },
      flterHeight: {
        type: Number,
        default: 30,
        validator(val) {
          return val >= 16;
        }
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      let getSate = inState(this.value);
      return {
        boxSelectionStyle: {
          display: "none"
        },
        time: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        day: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        fitStatue: getSate, // [], // 被分割成7组24的数字
        downOff: false
      };
    },
    computed: {
      txtShowStatue: function () {
        return this.fitStatue.map(item => getRepeat(item));
      },
      resetValue: function () {
        return this.fitStatue.flat(2);
      }
    },
    watch: {
      value(_new) {
        this.fitStatue = inState(_new);
        console.log(_new, this.fitStatue);
      }
    },
    methods: {
      /** 24小时快速选择 */
      timeTitle(index) {
        if (this.disabled) return;

        let nums = copy(this.fitStatue);
        let garr = nums.map(item => item[index]);
        let state = garr.indexOf(0) >= 0;
        nums.forEach(item => {
          item[index] = state ? 1 : 0;
        });
        this.$emit("input", undoState(nums));
      },
      /** 星期1～7快速选择 */
      dayTitle(index) {
        if (this.disabled) return;
        let nums = copy(this.fitStatue);
        let state = nums[index].indexOf(0) >= 0;
        nums[index].fill(state ? 1 : 0);

        this.$emit("input", undoState(nums));
      },
      // 快速设置按钮方案：
      dayTf(n) {
        if (this.disabled) return;
        let nums = copy(this.fitStatue);
        switch (n) {
          case "all":
            nums = nums.map((item, index) => item.fill(1));
            break;
          case "restDay":
            nums = nums.map((item, index) => item.fill(index < 5 ? 1 : 0));
            break;
          default:
            nums = nums.map((item, index) => item.fill(index < 5 ? 0 : 1));
        }
        this.$emit("input", undoState(nums));
      },
      /** 鼠标选择方案 框选 + 点击 */
      down(ev) {
        if (this.disabled) {
          return;
        }
        // 开锁
        this.downOff = true;
        this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        this.scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        this.boxData = this.$refs.time_bloack_box.getBoundingClientRect();
        let y = ev.pageY - this.boxData.y - this.scrollTop;
        let x = ev.pageX - this.boxData.x - this.scrollLeft;
        this.downData = {
          y,
          x
        };
        // 鼠标位于bg磁性坐标于的偏移量
        this.dowBgDval = {
          top: y % this.tdSize,
          left: x % this.tdSize,
          bottom: this.tdSize - (y % this.tdSize),
          right: this.tdSize - (x % this.tdSize)
        };
        this.boxSelectionStyle = {
          top: y - this.dowBgDval.top + "px",
          left: x - this.dowBgDval.left + "px",
          width: this.tdSize + "px",
          height: this.tdSize + "px",
          display: "inline-block"
        };
      },
      move(ev) {
        if (this.disabled) {
          return;
        }
        /** 鼠标移动 (不会存在 yl === 0 ；xl === 0 的清空) */
        if (this.downOff) {
          //移动坐标处理
          let y = ev.pageY - this.boxData.y - this.scrollTop;
          let x = ev.pageX - this.boxData.x - this.scrollLeft;
          //移动距离 + | -
          let yl = y - this.downData.y;
          let xl = x - this.downData.x;
          //移动 【绝对】 距离
          let ylAbs = Math.abs(yl);
          let xlAbs = Math.abs(xl);
          // 变量抽离
          let top = this.downData.y - this.dowBgDval.top + "px";
          let left = this.downData.x - this.dowBgDval.left + "px";
          let w = this.tdSize + "px";
          let h = this.tdSize + "px";
          /** 顺势框选
                  yl > 0  向下移动鼠标
                  xl > 0  向右滑动
              */
          if (yl > 0) {
            if (y > this.downData.y + this.dowBgDval.bottom) {
              // 有效移动
              if (y < this.downData.y + this.dowBgDval.bottom + this.tdSize) {
                //移动到下一格范围，但实距离<1个单元格距离
                h = this.tdSize * 2 + "px";
              } else {
                //已经达到通过移动单元格距离来计算宽度： h = 实际距离/格子宽度 + 半个磁性偏移量
                h = (Math.ceil((yl - this.dowBgDval.bottom) / this.tdSize) + 1) * this.tdSize + "px";
              }
            }
          }
          if (xl > 0) {
            if (x > this.downData.x + this.dowBgDval.right) {
              // 有效移动
              if (x < this.downData.x + this.dowBgDval.right + this.tdSize) {
                w = this.tdSize * 2 + "px";
              } else {
                w = (Math.ceil((xl - this.dowBgDval.right) / this.tdSize) + 1) * this.tdSize + "px";
              }
            }
          }
          /** 逆势框选   */
          if (yl < 0) {
            if (y < this.downData.y - this.dowBgDval.top) {
              // 有效移动
              if (y > this.downData.y - this.dowBgDval.top - this.tdSize) {
                h = this.tdSize * 2 + "px";
              } else {
                h = (Math.ceil((ylAbs - this.dowBgDval.top) / this.tdSize) + 1) * this.tdSize + "px";
              }
              top = Math.floor(y / this.tdSize) * this.tdSize + "px";
            }
          }
          if (xl < 0) {
            if (x < this.downData.x - this.dowBgDval.left) {
              // 有效移动
              if (x > this.downData.x - this.dowBgDval.left - this.tdSize) {
                w = this.tdSize * 2 + "px";
              } else {
                w = (Math.ceil((xlAbs - this.dowBgDval.left) / this.tdSize) + 1) * this.tdSize + "px";
              }
              left = Math.floor(x / this.tdSize) * this.tdSize + "px";
            }
          }
          this.boxSelectionStyle = {
            top: top,
            left: left,
            width: w,
            height: h,
            display: "inline-block"
          };
        }
      },
      up(ev) {
        if (this.downOff) {
          this.mousefn(ev);
          this.downOff = false;
        }
      },
      leave(ev) {
        if (this.downOff) {
          this.mousefn(ev);
          this.downOff = false;
        }
      },
      mousefn() {
        if (this.disabled) return;
        const dayStart = parseInt(this.boxSelectionStyle.top) / this.tdSize; //天数组索引 start
        const dayEnd = parseInt(this.boxSelectionStyle.height) / this.tdSize + dayStart - 1; //天数组索引 end
        const timeStart = parseInt(this.boxSelectionStyle.left) / this.tdSize; //小时数组（子）索引 start
        const timeEnd = parseInt(this.boxSelectionStyle.width) / this.tdSize + timeStart - 1; //小时数组（子）索引 end

        let nums = copy(this.fitStatue);
        for (let i = dayStart; i <= dayEnd; i++) {
          let dayItem = nums[i];
          for (let e = timeStart; e <= timeEnd; e++) {
            dayItem[e] = dayItem[e] == 1 ? 0 : 1;
          }
        }
        this.$emit("input", undoState(nums));

        this.boxSelectionStyle = {
          display: "none"
        };
      }
    }
  };
</script>

<style lang="scss">
  $color: #409eff;
  $selcet-cover: rgba(64, 158, 255, 0.7);
  $border-color: #dcdfe6;
  $bg-color:#f5f7fa;

  .schedule_box {
    /* padding: 2px; */
    /* background: #f5f5f5db; */
    display: inline-block;
    position: relative;
    overflow: hidden;
    box-sizing: content-box;
    color: #1f2d3d;
    -moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  }


  /* 0~24 */
  .time_title_box {
    font-size: 0;

    span {
      font-size: 9px;
      display: inline-block;
      text-align: center;
      border: 1px solid #eaeefb;
      border-left: none;
      line-height: 20px;
    }
  }


  /* 主体 */
  .schedule_body_box {
    overflow: hidden;
    font-size: 0;
  }

  /* 周 1～7 */
  .day_title_box {
    display: flex;
    float: left;
    flex-flow: column nowrap;
    text-align: center;
  }

  .day_title_box>span {
    font-size: 9px;
    border: 1px solid $border-color;
  }

  /* 块 */
  .time_bloack_box {
    /* border: 2px solid; */
    float: left;
    position: relative;
  }

  .time_bloack_box span {
    font-size: 0;
    height: 25px;
    display: inline-block;
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    background: $bg-color;
    /* &:hover {
      background: #ecf5ff;
    } */
  }

  .time_bloack_box .schedule_time_item_yes {
    background-color: $color;
    border-color: #b3d8ff
  }

  .time_bloack_box>div {
    position: relative;
  }

  .time_bloack_box>div>i {
    display: inline-block;
    position: absolute;
    top: 0;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: #fff;
    background: $selcet-cover;
    box-sizing: border-box;
    /* &:hover {
      background-color: rgba(64, 158, 255, 0.3);
    } */
  }


  em.move_bg {
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    display: none;
    z-index: 2;
  }

  /* 脚 */
  .schedule_flter_box {
    font-size: 9px;
    overflow: hidden;
  }

  .schedule_flter_box>div {
    font-size: 9px;
    display: inline-block;
  }

  .schedule_flter_box>*:nth-child(n) {
    font-size: 9px;
    display: inline-block;
  }

  .flter_msg_box {
    float: right;
    vertical-align: baseline;
    overflow: hidden;
    line-height: inherit;
  }

  .flter_msg_box span {
    margin-left: 0.5rem;
  }

  .flter_msg_box i {
    display: inline-block;
    margin-bottom: -3px;
    height: 17px;
    width: 17px;
    border: 0.5px solid $border-color;
  }

  .stop_b {
    background: #e9e8ec;
  }

  .play_b {
    background: $color;
  }

  .flter_btn_box {
    float: left;
    line-height: inherit;
  }

  .flter_btn_box>span {
    display: inline-block;
    line-height: 0.8;
    white-space: nowrap;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin-right: 0.25rem;
    font-weight: 500;
    padding: 0.25rem;
    font-size: 9px;
    border-radius: 4px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .time_title_box>span,
  .flter_btn_box>span,
  .day_title_box>span,
  .time_bloack_box {
    cursor: pointer;
    background: #fff;
  }

  .time_title_box>span:hover,
  .day_title_box>span:hover,
  .flter_btn_box>span {
    color: $color;
    background: #ecf5ff;
  }

  .flter_btn_box>span:hover {
    color: #fff;
    background-color: $color;
    border-color: $color;
  }

  /* 只读 */
  .schedule_box .disabledstyle {
    opacity: 0.6;
    pointer-events: none;
    cursor: not-allowed !important;
  }
</style>