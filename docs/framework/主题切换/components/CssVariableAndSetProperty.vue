<template>
  <div class="color-css-variable-and-set-property-container">
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
const setCssVar = (prop, val, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}
const colorMap = {
  pink: {
    bgc: "pink",
    text: "red",
  },
  skyblue: {
    bgc: "skyblue",
    text: "rgb(33, 28, 28)",
  },
  orange: {
    bgc: "orange",
    text: "green",
  },
}
const onRadioChange = (e) => {
  const el = document.querySelector(".color-css-variable-and-set-property-container");
  setCssVar("--background-color", colorMap[e].bgc, el);
  setCssVar("--text-color", colorMap[e].text, el);
};
</script>

<style scoped lang="less">
.color-css-variable-and-set-property-container {
  --background-color: pink;
  --text-color: red;
  
  .show-div {
    background-color: var(--background-color);
    color: var(--text-color);
  }
}
</style>
