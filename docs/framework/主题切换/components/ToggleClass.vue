<template>
  <div class="color-toggle-class-container pink">
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
  const el = document.querySelector(".color-toggle-class-container");
  el.className = "color-toggle-class-container " + e;
};
</script>

<style scoped lang="less">
.color-toggle-class-container {
  &.pink {
    .show-div {
      background-color: pink;
      color: red;
    }
  }
  &.skyblue {
    .show-div {
      background-color: skyblue;
      color: rgb(33, 28, 28);
    }
  }
  &.orange {
    .show-div {
      background-color: orange;
      color: green;
    }
  }
}
</style>
