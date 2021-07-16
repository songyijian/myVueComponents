<!--
 * @Description: 衰减加载条（拼多多耍猴玩法）,自身永远加载不完，:end=true后完成加载
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-15 15:03:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-16 15:41:22
-->
<template>
  <div class="progress-bar">
    <span ref="progression" :style="style"></span>
    {{end}}
  </div>
</template>

<script>
import { tIntervarl } from "./tools.js";
let ot = null;

export default {
  name: "DecayLodingBar",
  props: {
    speed: {
      type: Number,
      default: 5
    },
    end: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let s = this.speed;
    return {
      toWidth: 0,
      myspeed: s
    };
  },
  watch: {
    speed(_new) {
      this.myspeed = _new;
    },
    end(_new,old) {
      _new && this.endfn();
    }
  },
  computed: {
    style() {
      return {
        width: this.toWidth + "%",
        transition: `width ${this.myspeed}s linear`
      };
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    ot && ot.clear();
  },
  methods: {
    init(){
      if (this.end) {
        this.endfn();
        return;
      }
      let d = 2.2;
      let s = 1;
      ot = tIntervarl(() => {
        ot.setTime(1000 * this.myspeed); // 动态修改时间
        let a = (100 - this.toWidth) / d;
        this.toWidth = this.toWidth + a;
        d = d + s;
      }, 0);
    },
    reset(){
      ot && ot.clear();
      this.toWidth = 0;
      this.myspeed = 0;
      this.$nextTick(()=>{
        this.myspeed = this.speed
        this.init()
      })
    },
    endfn() {
      ot && ot.clear();
      this.toWidth = 100;
      this.myspeed = 0.1;
    }
  }
};
</script>

<style lang="scss" scoped>
.progress-bar {
  overflow: hidden;
  width: 200px;
  height: 3px;
  background: #ccc;
  border-radius: 2.38px;
  font-size: 0;
  span {
    display: inline-block;
    width: 0%;
    height: 100%;
    background-color: #44d7b6;
  }
}
</style>
