<template>
  <div class="image-colord">
    <img
      crossorigin="anonymous"
      v-for="(item, i) in images"
      :key="item"
      :src="item"
      :style="{opacity: hoverIndex === i ? 1 : hoverIndex === -1 ? 1 : 0.2}"
      @mouseenter="handleImageMoveEnter($event.target, i)"
      @mouseleave="handleImageMoveLeave"
      />
  </div>
</template>
<script setup>
import { ref } from "vue";
import ColorThiref from "colorthief";
const colorThief = new ColorThiref(); 
  const images = [
    "/images/test1.jfif",
    "/images/test2.jfif",
    "/images/test3.jfif",
    "/images/test4.jfif",
  ];
  const html = document.documentElement;
  const hoverIndex = ref(-1);
  async function handleImageMoveEnter(img, i) {
    hoverIndex.value = i;
    // 取出图片中的前三种主要颜色
    let colors = await colorThief.getPalette(img, 3);
    colors = colors?.map(v => `rgb(${v[0]}, ${v[1]}, ${v[2]})`) || [];
    html.style.setProperty("--c1", colors[0]);
    html.style.setProperty("--c2", colors[1]);
    html.style.setProperty("--c3", colors[2]);
  }

  function handleImageMoveLeave() {
    hoverIndex.value = -1;
  }

</script>
<style scoped lang="less">
.image-colord {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background: linear-gradient(var(--c3), var(--c2), var(--c1));
  padding: 40px;
  img {
    width: calc(50% - 10px);
    transition: all 0.5s;
    &:hover {
      transform: scale(1.1);
      border-radius: 4px;
      border: 4px solid #fff;
    }
  }
}
</style>
