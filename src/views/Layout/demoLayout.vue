<template lang="html">
  <div class="layout-components">
    <div class="menu-list">
      <router-link v-for="item in componentsConfig" :to="item.path">
        {{ item.name }}
      </router-link>
    </div>
    <router-view class="content" />
  </div>
</template>

<script>
import routes from '@/router/components.config.js'
export default {
  name: 'demoLayout',
  data() {
    return {
      componentsConfig: routes.children
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
.layout-components {
  display: flex;
  flex-flow: row;
  box-sizing: border-box;
  .menu-list {
    border-right: 1px solid #ccc;
    width: 240px;
    flex: 0 0 240px;
    min-height: 100vh;
    a {
      display: block;
      // background: #ccc;
      padding: 0 1rem;
      margin-bottom: 1rem;
      color: #000;
    }
    .router-link-active {
      color: blue;
    }
  }
  .content {
    padding: 0 2rem;
  }
}
</style>
