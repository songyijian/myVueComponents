<template lang='html'>
  <div>
  <!-- <router-view v class="content"/> -->
  <!-- <router-link v-for="item in routes" :to="item.path" :key="item.path" :children="item.children" >{{item.name}}</router-link> -->
    <!-- {{$route}} -->
    <!-- <div id="nav">
      <router-link v-for="item in children" :to="item.path" :key="item.path" >{{item.name}}</router-link>
    </div>
    -->
    <!-- <router-view class="content"/>  -->

  </div>
</template>

<script>
import routes from '~config/router.config.js'

export default {
  name: 'LearnBox',
  /* :{
    children:Array
  }, */
  mounted(){
    // console.log(this.$route);
    // routes.
  }
}
</script>

<style scoped lang="scss">
</style>
