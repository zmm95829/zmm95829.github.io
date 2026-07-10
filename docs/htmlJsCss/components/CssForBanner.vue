<template>
  <div class="container">
    <div class="title"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const componentName = ref('')
</script>

<style scoped>

    .container {
      background-color: lightblue;
      height: 200px;
      width: 400px;
      margin: 0 auto;
      border: 3px solid;
    }
    .title {
      height: 80px;
      background-color: orange;
      box-shadow: 0 2px 15px rgba(50, 50, 50, 0.8);
      position: relative;

      /* 将 title 拉长 */
      margin: 30px -30px;
    }
    .title::before,
    .title:after {
      box-shadow: 0 2px 15px rgba(50, 50, 50, 0.8);
      content: "";
      position: absolute;
      width: 30px;
      height: 80px;
      background-color: darkorange;

      transform: skewY(45deg);
      top: 15px;
      z-index: -1;
    }
    .title::after {
      right: 0;
      transform: skewY(-45deg);
    }
</style>