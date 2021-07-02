<template>
  <div>
    <h1>ScheduleOnly - 小时周期控件页面内自能存在一个</h1>
    <div class="row" v-if="sval">
      <ScheduleOnly
        @change="fn"
        :tdSize="30"
        :disabled="disabled"
        :val="sval"
      ></ScheduleOnly>
    </div>

    <div class="row">
      <span class="btn" @click="disabledfn">disabled: {{ disabled }}</span>
    </div>
    <div class="row">{{ gval }}</div>
    <pre>
    功能
      1.支持单位框选、点选
      2.行列快选、反选
      3.快捷选择面板
    API
      &lt;Schedule @change="fn" :val="" >
        :val="[]"           #必须是只包含1|0的168位数组 (1选，2未选)*
        @change="fn"      #修改监听函数fn(val)
        :disabled="true"    #是否可编辑
        :tdSize="30"        #每个格子的大小(px) 不<16
        :timeHeight="30"    #0-23小时列快速选择按钮高度(px) 不<16
        :dayWidth="50"      #周1-7行速选择按钮宽度(px) 不<16 [高度是根据tdSize算出来的]
  </pre
    >
  </div>
</template>

<script>
import ScheduleOnly from "@contol/ScheduleOnly";
export default {
  name: "DemoScheduleOnly",
  components: { ScheduleOnly },
  data() {
    return {
      disabled: true,
      // sval:Array(24*7).fill(1),
      sval: null,
      gval: null,
    };
  },
  mounted() {
    this.$get("/mock/Schedule", { a: 1 }).then((res) => {
      // console.log(res);
      if (res.code === 200) {
        this.sval = res.data;
      }
    });
  },
  methods: {
    disabledfn() {
      this.disabled = !this.disabled;
    },
    fn(n) {
      this.gval = n;
    },
  },
};
</script>
