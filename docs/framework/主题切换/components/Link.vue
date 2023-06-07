<template>
  <div class="color-link-container">
    <div class="show-div">看背景色和文字颜色</div>
    <el-radio-group v-model="radioValue" @change="onRadioChange">
      <el-radio label="pink">粉色</el-radio>
      <el-radio label="skyblue">天蓝色</el-radio>
      <el-radio label="orange">橘色</el-radio>
    </el-radio-group>
  </div>
</template>

<script setup>
import { ref } from "vue";

const radioValue = ref("pink");
const loadRes = function (name, type, fn) {
  let ref;
  if (type === "js") {
    // 外部js
    ref = document.createElement("script");
    ref.setAttribute("type", "text/JavaScript");
    ref.setAttribute("src", name);
  } else if (type === "css") {
    // 外部css
    ref = document.createElement("link");
    ref.setAttribute("rel", "stylesheet");
    ref.setAttribute("type", "text/css");
    ref.setAttribute("href", name);
  } else if (type === "style") {
    // style
    ref = document.createElement("style");
    ref.innerhtml = name;
  }
  if (typeof ref !== "undefined") {
    document.getElementsByTagName("head")[0].appendChild(ref);
    ref.onload = function () {
      // 加载完成执行
      typeof fn === "function" && fn();
    };
  }
};
loadRes("/style/color_pink.css", "css");
const onRadioChange = (e) => {
  const link = document.querySelector("link[href^='/style/color_']");
  const href = link.getAttribute("href");
  const _index = href.indexOf("_");
  link.setAttribute("href", href.slice(0, _index + 1) + e + ".css");
};
</script>
<style scoped lang="less">
</style>
