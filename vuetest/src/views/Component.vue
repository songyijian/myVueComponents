<template>
  <div id="comp_box">
    <!-- 目录 -->
    <CompMenu id="comp_menu"/>
    <!-- 主体部分 -->
    <div id="comp_main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import CompMenu from './CompMenu.vue'
export default {
  components: {
    CompMenu
  },
//methods:{ }
}
</script>

<style lang="scss" src="../assets/component.scss"></style>
