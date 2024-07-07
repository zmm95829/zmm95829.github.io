<template>
  <div class="waterfall-flow-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
onMounted(() => {
  // 容器
  const container = document.querySelector(".waterfall-flow-container");
  // 图片固定宽度 220px
  const imgWidth = 120;

  // 添加图片
  function createImgs() {
    for (let i = 1; i < 5; i++) {
      const img = document.createElement("img");
      img.src = `/images/test${i}.jfif`;
      img.style.width = `${imgWidth}px`;
      // 每张图片加载完就设置位置
      img.onload = setPostions;
      img.style.height = (i % 2 === 0 ?  120 : 150) + "px";
      container.appendChild(img);
    }
  }

  // 计算列数以及间距
  function cal() {
    const containerWidth = container.clientWidth;
    const columns = Math.floor(containerWidth/imgWidth);
    const spaceNumber = columns + 1;
    // 剩余宽度
    const leftSpace = containerWidth - columns * imgWidth;
    // 间距宽度
    const space = leftSpace / spaceNumber;
    return {
      columns,
      space
    };
  }

  // 设置图片位置
  function setPostions() {
    const { space, columns } = cal();
    // 数组长度为列数，每一项表示该列下一个图片的纵坐标
    const nextTops = new Array(columns);
    // 将数组的每一项填充为 0
    nextTops.fill(0);
    for (let i = 0; i < container.children.length; i ++) {
      const img = container.children[i];
      // 找到数组中纵坐标最小值最为当前图片的纵坐标
      const minTop = Math.min.apply(null, nextTops);
      img.style.top = minTop + "px";
      // 最小值是第几列
      const index = nextTops.indexOf(minTop);
      nextTops[index] += img.clientHeight + space;
      const left  = (index + 1) * space + index * imgWidth;
      img.style.left = left + "px";
    }
    const maxTop = Math.max.apply(null, nextTops);
    container.style.height = maxTop + "px";;
  }



  createImgs();
  createImgs();
  createImgs();
  createImgs();
  createImgs();
  createImgs();
  
  let timer = null;
  window.addEventListener("resize", () => {
    if (timer) {
      clearInterval(timer);
    }
    timer = setTimeout(() => {
      setPostions();
    }, 100);
  })
})
</script>
<style lang='less'>
.waterfall-flow-container {
  position: relative;
  border: 1px solid red;
  
  img {
    position: absolute;
    transition: all 0.3s;
  }
}
</style>