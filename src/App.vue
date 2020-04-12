<template>
  <div id="app">
    <nav id="nav">
      <router-link v-for="item in routes" :to="item.path" :key="item.path">{{item.name}}</router-link>
    </nav>
    <router-view class="content"/>
  </div>
</template>

<script>
import routes from '~config/router.config.js'
export default {
  name: 'App',
  data(){
    return({
      routes
    })
  }
}
</script>


