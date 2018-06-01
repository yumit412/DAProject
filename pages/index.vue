<template>
  <section class="container">
    <h1 class="title">
      Universal Vue.js Application Framework
    </h1>
    <nuxt-link class="button" to="/about">
      About page
    </nuxt-link>
    <nuxt-link class="button" to="/motion_graph">
      Motion Graph
    </nuxt-link>
    <nuxt-link class="button" to="/crank_motion">
      crank_motion
    </nuxt-link>
  </section>
</template>

<style scoped>
.title {
  margin: 50px 0;
}
</style>

<script>
const app = require('./app')

//  eslint-disable-next-line no-unused-vars
const application = app.application
</script>
