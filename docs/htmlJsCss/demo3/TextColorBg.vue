<template>
  <div class="trapezoid-container">
    <h1 class="title">厚德载物，自强不息</h1>
  </div>
</template>

<script setup>
</script>
<style scoped lang='less'>
.trapezoid-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border: 1px solid #000;
  background-color: #000;
  position: relative;
  .title {
    z-index: 2;
    color: #fff;
    position: absolute;
    top: 40%;
    left: 28%;
    mix-blend-mode: difference;
    transition: all 0.3s;
  }
  &:hover .title {
    transform: translateX(-100px);
  }
  &::before {
    content: "";
    height: 100%;
    width: 100%;
    border: 1px solid #000;
    background-color: #fff;
    display: block;
    clip-path: polygon(0 0, 0 100%, 60% 100%, 60% 0);
  }
  &::after {
    content: "";
    height: 100%;
    width: 100%;
    border: 1px solid #000;
    background-color: #000;
    display: block;
    position: absolute;
    top: 0;
    clip-path: polygon(100% 0, 40% 0, 60% 100%, 100% 100%);
  }
}
</style>