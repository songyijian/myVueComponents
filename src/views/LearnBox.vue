<template lang="html">
  <div class="learn">
    <div class="list">
      <router-link v-for="item in crouter" :to="item.path" :key="item.path">{{
        item.name
      }}</router-link>
    </div>
    <router-view class="content" />
  </div>
</template>

<script>
import routes from "@router/router.config.js";

export default {
  name: "LearnBox",
  data() {
    return {
      crouter: [],
    };
  },
  mounted() {
    var frouter = "/" + this.$route.path.split("/")[1];
    if (frouter === "/learn") {
      routes.forEach((element) => {
        if (element.path === frouter) {
          this.crouter = element.children;
        }
      });
    }
  },
};
</script>

<style scoped lang="scss">
.learn {
  display: flex;
  flex-direction: row;
  .list {
    width: 15rem;
    a {
      display: block;
      line-height: 2rem;
      background-color: #ccc;
      margin: 2px 0;
    }
  }
  .content {
    flex: auto;
    padding: 1rem 0 1rem 1rem;
  }
}
</style>
