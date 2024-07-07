<template>
  <div class="carousel-container">
    <img v-for="item in images" :key="item" class="carousel-item" :src="item" />
    <div class="prev"></div>
    <div class="next"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
const images = [
  "/images/test1.jfif",
  "/images/test2.jfif",
  "/images/test3.jfif",
  "/images/test4.jfif"
];

onMounted(() => {
  const items = document.querySelectorAll(".carousel-item");
  // 当前显示的是第几个
  let index = 0;
  // 不同的轮播图主要就是 layout 不一样
  function layout() {
    // 两个图之间的间隔
    const xOffsetStep = 30;
    // 缩放的递减倍率
    const scaleStep = 0.6;
    const opacityStep = 0.8;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let xOffset = (i - index) * xOffsetStep;
      const dis = Math.abs(i - index);
      const zIndex = items.length - dis;
      item.style.zIndex = zIndex;
      const opacity = opacityStep ** dis;
      item.style.opacity = opacity;
      const scale = scaleStep ** dis;
      const sign = Math.sign(1 - index);
      if (i !== index) {
        // xOffset = xOffset + 100 * sign;
      }
      const rotateY = i === index ? 0 : 45 * -sign;
      item.style.transform = `translateX(${xOffset}px) scale(${scale}) rotateY(${rotateY}deg)`;
    }
  }

  layout();
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  prev.addEventListener("click", () => {
    index--;
    if (index < 0) {
      index = 0;
    }
    layout();
  });
  next.addEventListener("click", () => {
    index++;
    if (index > items.length - 1) {
      index = index.length - 1;
    }
    layout();
  });
  items.forEach((item, i) => {
    item.addEventListener("click", () => {
      index = i;
      layout();
    });
  });
});
</script>
<style scoped lang='less'>
.carousel-container {
  display: flex;
  flex-wrap: nowrap;
  .carousel-item {
    width: 400px;
    height: 400px;
    transition: all 0.5s;
  }
}
</style>