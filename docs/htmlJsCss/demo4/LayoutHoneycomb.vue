<template>
  <div class="honeycomb-container"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
onMounted(() => {
  const images = [
    "/images/test1.jfif",
    "/images/test2.jfif",
    "/images/test3.jfif",
    "/images/test4.jfif"
  ];
  const itemEnterFn = function (cur) {
    const className = cur.target.className;
    // 使用正则表达式匹配行数和列数
    const rowMatch = className.match(/row-(\d+)/);
    const colMatch = className.match(/col-(\d+)/);

    let row, col;

    if (rowMatch) {
      row = parseInt(rowMatch[1], 10);
    }

    if (colMatch) {
      col = parseInt(colMatch[1], 10);
    }
    // 当前元素设置放大
    cur.target.classList.add("enlarge");
    // 需要缩小的元素
    const rowReduce = row - 1;
    const colReduce = col - 1;
    const rowEnlarge = row + 1;
    const colEnlarge = col + 1;
    const reduceArr = row % 2 === 0 ? [
      `row-${rowReduce}__col-${colReduce}`,
      `row-${rowReduce}__col-${col}`,
      `row-${row}__col-${colReduce}`,
      `row-${row}__col-${colEnlarge}`,
      `row-${rowEnlarge}__col-${colReduce}`,
      `row-${rowEnlarge}__col-${col}`,
    ] : [
      `row-${rowReduce}__col-${col}`,
      `row-${rowReduce}__col-${colEnlarge}`,
      `row-${row}__col-${colReduce}`,
      `row-${row}__col-${colEnlarge}`,
      `row-${rowEnlarge}__col-${col}`,
      `row-${rowEnlarge}__col-${colEnlarge}`,
    ];
    reduceArr.forEach(v => {
      document.querySelector(`.${v}`)?.classList.add("reduce");
    })
  };
  const itemLeaveFn = function (cur) {
    const lines = document.querySelectorAll(".honeycomb-container .line");
    Array.from(lines).forEach(v => {
      Array.from(v.children).forEach(item => {
        item.classList.remove("enlarge");
        item.classList.remove("reduce");
      })
    })
  };
  const pDom = document.querySelector(".honeycomb-container");
  const length = 60;
  const oddLength = 9;
  const evenLength = 10;
  // 奇数行9个偶数行10个
  let lineLength = oddLength;
  const pDomWidth = pDom.clientWidth;
  // 宽度按照 9 个计算
  const itemWidth = pDomWidth / oddLength;
  let line = document.createElement("div");
  line.classList.add("line");
  let row = 1;
  let col = 1;
  for (let i = 0; i < length; i++) {
    if (line.children.length === lineLength) {
      let style = `--item-width: ${itemWidth}px;`;
      if (lineLength === oddLength) {
        lineLength = evenLength;
      } else {
        lineLength = oddLength;
      }
      const index = pDom.children.length;
      if (index % 2 === 1) {
        style += ` transform: translateX(${-itemWidth / 2}px);`;
      }
      if (row > 1) {
        style += `margin-top: ${-itemWidth / 5}px;`;
      }
      line.style = style;
      pDom.append(line);
      line = document.createElement("div");
      line.classList.add("line");
      row += 1;
      col = 1;
    }
    const item = document.createElement("img");
    item.src = images[i % images.length];
    item.classList.add("item");
    item.classList.add(`row-${row}__col-${col}`);
    item.onmouseenter = itemEnterFn;
    item.onmouseleave = itemLeaveFn;
    line.append(item);
    col += 1;
  }
});
</script>
<style lang='less'>
// 一行 n 个
@n: 10;
.honeycomb-container {
  @size: calc(688px / @n);
  width: 100%;
  overflow: hidden;
  .line {
    display: flex;
  }
  .item {
    background-color: #000;
    width: var(--item-width);
    height: var(--item-width);
    clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 0% 75%, 0% 25%);
    transition: all 0.3s;
    &.enlarge {
      transform: scale(1.2);
    }
    &.reduce {
      transform: scale(0.7);
    }
  }
}
</style>