<template>
  <div class="color-toggle-class-and-css-variable-container">
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
  const el = document.querySelector(".color-toggle-class-and-css-variable-container");
  el.className = "color-toggle-class-and-css-variable-container " + e;
};
</script>

<style scoped lang="less">
.color-toggle-class-and-css-variable-container {
  &, &.pink {
    --background-color: pink;
    --text-color: red;
  }
  &.skyblue {
    --background-color: skyblue;
    --text-color: rgb(33, 28, 28);
  }
  &.orange {
    --background-color: orange;
    --text-color: green;
  }
  .show-div {
    background-color: var(--background-color);
    color: var(--text-color);
  }
}
</style>
