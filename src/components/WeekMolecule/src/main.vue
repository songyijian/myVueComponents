<!--
 * @Description: WeekMolecule 周小时粒度管理控件
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-07 15:51:39
 * @LastEditors: yijian.song
 * @LastEditTime: 2021-07-12 00:53:54
-->
<template lang="html">
  <div class="week-molecule" :class="{ disabledstyle: disabled }">
    <div class="body">
      <div class="column">
        <span v-for="(item, index) in time" :key="item" @click="columnSelect(index)" :style="{width: `${size}px`}">
          {{ item }}
        </span>
      </div>
      <div class="row">
        <span v-for="(item, index) in day" :key="item" @click="rowSelect(index)" :style="{
              height: `${size}px`,
              'line-height': `${size}px`
            }">
          {{ item }}
        </span>
      </div>
      <div ref="molecule" class="molecule" @mousedown="down($event)" @mouseup="up($event)" @mousemove="move($event)"
        @mouseleave="leave($event)">
        <div v-for="(itemf, indexf) in fitStatue" :key="'f' + indexf" :style="{ height: `${size}px` }">
          <span v-for="(item, index) in itemf" :style="{
                width: `${size}px`,
                height: `${size}px`
              }" :key="'c' + index + indexf" :class="{ isselect: item == 1 }">
            {{ index }}
          </span>
          <i v-for="(item, index) in infoStatue[indexf]" :style="{
                height: `${size}px`,
                'line-height': `${size}px`,
                width: `${item.length * size}px`,
                left: `${item.start * size}px`
              }">
            {{ item.length == 24 ? "全天" : `${item.start}:00 - ${item.end + 1}:00` }}
          </i>
        </div>
        <em class="box-select-style" :style="[boxSelectionStyle]"></em>
      </div>
    </div>

    <div class="schedule_flter_box">
      快速设定：
      <div class="flter_btn_box">
        <button @click="dayTf('all')">全周</button>
        <button @click="dayTf('restDay')">周一至五</button>
        <button @click="dayTf('workingDay')">周六日</button>
      </div>
      <div class="flter_msg_box">
        <span>
          <i class="play_b"></i>
          有效时间
        </span>
      </div>
    </div>
    <input type="hidden" :value="value" />


    <el-calendar v-model="tnow">
    </el-calendar>
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
      size: {
        type: Number,
        default: 32,
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
        tnow: new Date(),
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
      infoStatue: function () {
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
      columnSelect(index) {
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
      rowSelect(index) {
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
        this.boxData = this.$refs.molecule.getBoundingClientRect();
        let y = ev.pageY - this.boxData.y - this.scrollTop;
        let x = ev.pageX - this.boxData.x - this.scrollLeft;
        this.downData = {
          y,
          x
        };
        // 鼠标位于bg磁性坐标于的偏移量
        this.dowBgDval = {
          top: y % this.size,
          left: x % this.size,
          bottom: this.size - (y % this.size),
          right: this.size - (x % this.size)
        };
        this.boxSelectionStyle = {
          top: y - this.dowBgDval.top + "px",
          left: x - this.dowBgDval.left + "px",
          width: this.size + "px",
          height: this.size + "px",
          display: "inline-block"
        };
      },
      move(ev) {
        if (this.disabled) return;
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
          let w = this.size + "px";
          let h = this.size + "px";
          /** 顺势框选
                  yl > 0  向下移动鼠标
                  xl > 0  向右滑动
              */
          if (yl > 0) {
            if (y > this.downData.y + this.dowBgDval.bottom) {
              // 有效移动
              if (y < this.downData.y + this.dowBgDval.bottom + this.size) {
                //移动到下一格范围，但实距离<1个单元格距离
                h = this.size * 2 + "px";
              } else {
                //已经达到通过移动单元格距离来计算宽度： h = 实际距离/格子宽度 + 半个磁性偏移量
                h = (Math.ceil((yl - this.dowBgDval.bottom) / this.size) + 1) * this.size + "px";
              }
            }
          }
          if (xl > 0) {
            if (x > this.downData.x + this.dowBgDval.right) {
              // 有效移动
              if (x < this.downData.x + this.dowBgDval.right + this.size) {
                w = this.size * 2 + "px";
              } else {
                w = (Math.ceil((xl - this.dowBgDval.right) / this.size) + 1) * this.size + "px";
              }
            }
          }
          /** 逆势框选   */
          if (yl < 0) {
            if (y < this.downData.y - this.dowBgDval.top) {
              // 有效移动
              if (y > this.downData.y - this.dowBgDval.top - this.size) {
                h = this.size * 2 + "px";
              } else {
                h = (Math.ceil((ylAbs - this.dowBgDval.top) / this.size) + 1) * this.size + "px";
              }
              top = Math.floor(y / this.size) * this.size + "px";
            }
          }
          if (xl < 0) {
            if (x < this.downData.x - this.dowBgDval.left) {
              // 有效移动
              if (x > this.downData.x - this.dowBgDval.left - this.size) {
                w = this.size * 2 + "px";
              } else {
                w = (Math.ceil((xlAbs - this.dowBgDval.left) / this.size) + 1) * this.size + "px";
              }
              left = Math.floor(x / this.size) * this.size + "px";
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
        const dayStart = parseInt(this.boxSelectionStyle.top) / this.size; //天数组索引 start
        const dayEnd = parseInt(this.boxSelectionStyle.height) / this.size + dayStart - 1; //天数组索引 end
        const timeStart = parseInt(this.boxSelectionStyle.left) / this.size; //小时数组（子）索引 start
        const timeEnd = parseInt(this.boxSelectionStyle.width) / this.size + timeStart - 1; //小时数组（子）索引 end

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

<style lang="scss" scoped>
  $color: #409eff;
  $selcet-cover: rgba(64, 158, 255, 0.7);
  $border-color: #EBEEF5;
  $bg-color: #fff; //#f5f7fa;

  .week-molecule {
    background-color: #fff;
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

  .body {
    border: 1px solid $border-color;
    overflow: hidden;
    font-size: 0;

    .column {
      font-size: 0;
      /* text-align: right; */
      padding-left: 35px;
      height: 25px;
      line-height: 25px;
      font-size: 12px;

      &>span {
        height: 100%;
        display: inline-block;
        text-align: center;
        border-left: 1px solid #eaeefb;
      }
    }

    .row {
      float: left;
      width: 35px;
      text-align: center;

      span {
        display: inline-block;
        width: 100%;
        font-size: 9px;
        border-top: 1px solid $border-color;
      }
    }

  }


  .molecule {
    float: left;
    position: relative;

    span {
      font-size: 0;
      height: 25px;
      display: inline-block;
      border-left: 1px solid $border-color;
      border-top: 1px solid $border-color;
      background: $bg-color;

      &:hover {
        border: 1px solid rgb(63, 136, 245);
        background-color: #F2F8FE;
      }
    }
  }



  .molecule .isselect {
    background-color: $color;
    border-color: #b3d8ff
  }

  .molecule>div {
    position: relative;
  }

  .molecule>div>i {
    pointer-events: none;
    display: inline-block;
    position: absolute;
    top: 0;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: #fff;
    background: $selcet-cover;
    box-sizing: border-box;

  }


  em.box-select-style {
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
    /* border: 1px solid red; */
    border: 1px solid #DCDFE6;

    overflow: hidden;
    border-radius: 3px;



    button {
      min-width: 70px;
      background-color: #fff;
      border: none;
      border-radius: 0;


      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #FFF;
      /* border: 1px solid #DCDFE6; */
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;

      font-size: 12px;
      /* border-radius: 3px; */
      padding: 7px 15px;
    }
  }

  /* .flter_btn_box>span {
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
  } */

  .column>span,
  .flter_btn_box>span,
  .row>span,
  .molecule {
    cursor: pointer;
    background: #fff;
  }

  .column>span:hover,
  .row>span:hover,
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