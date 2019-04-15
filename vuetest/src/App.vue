<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/component">Component</router-link>
    </nav>
    <div id="main"> <router-view/> </div>
  </div>
</template>

<style lang="scss" src="./assets/index.scss"></style>
