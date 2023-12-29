<template>
  <div class="color-less-mixin-container">
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
const onRadioChange = (e) => {
  const el = document.querySelector(".color-less-mixin-container");
  el.className = "color-less-mixin-container " + e;
};
</script>

<style scoped lang="less">
@pink-bgc-color: pink;
@pink-text-color: red;
@skyblue-bgc-color: skyblue;
@skyblue-text-color: rgb(33, 28, 28);
@orange-bgc-color: orange;
@orange-text-color: green;

.bgc-color {
  .show-div, &.pink .show-div {
    background-color: @pink-bgc-color;
  }
  &.skyblue .show-div {
    background-color: @skyblue-bgc-color;
  }
  &.orange .show-div {
    background-color: @orange-bgc-color;
  }
}

.text-color {
  .show-div, &.pink .show-div {
    color: @pink-text-color;
  }
  &.skyblue .show-div {
    color: @skyblue-text-color;
  }
  &.orange .show-div {
    color: @orange-text-color;
  }
}

.color-less-mixin-container {
  .bgc-color();
  .text-color();
}
</style>
