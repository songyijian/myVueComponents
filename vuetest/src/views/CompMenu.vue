<template>
  <div class="menu">
    <h3></h3>
    <p>
      <router-link to="/component/compmain">component/compmain</router-link>
      <router-link to="/component/schedule">Schedule </router-link>
      <router-link to="/component/changelog">/component/changelog</router-link>
    </p>
  </div>
</template>

<script>
// import {routsData} from '../routs.js'


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.router-link-active{
  color: red

}
  a{
    display: block;
    line-height: 50px;
    font-size:20px;
  }

</style>
