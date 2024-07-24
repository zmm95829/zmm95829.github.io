<template>
  <div class="text-shadow">
    <div class="test1">文字阴影 text-shadow</div>
    <div class="test2">文字阴影 text-stroke</div>
    <div class="test3">文字阴影 stroke + after</div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
onMounted(() => {
  const test3 = document.querySelector(".test3");
  test3.dataset.content = test3.textContent;
})
</script>
<style scoped lang='less'>
.text-shadow {
  background-color: skyblue;
  padding: 20px;
  color: #000;
  font-size: 50px;
  font-weight: 900;
  div {
    margin-top: 30px;
  }
  .test1 {
    text-shadow:
      0 -2px #fff,
      2px 0 #fff,
      0 2px #fff,
      -2px 0 #fff,
      -2px -2px #fff,
      2px 2px #fff,
      2px -2px #fff,
      -2px 2px #fff;
    
  }
  .test2 {
    -webkit-text-stroke: 2px #fff;
  }
  .test3 {
    -webkit-text-stroke: 4px #fff;
    position: relative;
    &::after {
      content: attr(data-content);
      position: absolute;
      left: 0;
      top: 0;
      -webkit-text-stroke: 0;
    }
  }

}
</style>