<template>
  <div class="scroll-of-hight-light">
    <div class="toc">
      滚动高亮标题案例
      <ul>
        <li>
          <a class="level1 hightlight" href="#id1">标题1</a>
        </li>
        <li>
          <a class="level2" href="#id11">标题11</a>
        </li>
        <li>
          <a class="level3" href="#id12">标题12</a>
        </li>
        <li>
          <a class="level4" href="#id13">标题13</a>
        </li>
        <li>
          <a class="level1" href="#id2">标题2</a>
        </li>
        <li>
          <a class="level1" href="#id3">标题3</a>
        </li>
        <li>
          <a class="level1" href="#id4">标题4</a>
        </li>
        <li>
          <a class="level1" href="#id5">标题5</a>
        </li>
        <li>
          <a class="level1" href="#id6">标题6</a>
        </li>
      </ul>
    </div>
    <div ref="refName" class="content">
      <h1 id="id1">标题1</h1>
      <h2 id="id11">标题11</h2>
      <h3 id="id12">标题12</h3>
      <h4 id="id13">标题13</h4>

      <h1 id="id2">标题2</h1>
      <h1 id="id3">标题3</h1>
      <h1 id="id4">标题4</h1>
      <h1 id="id5">标题5</h1>
      <h1 id="id6">标题6</h1>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const refName = ref();

onMounted(() => {
  const hightlightName = "hightlight";
  // 根据 id 或者 dom 高亮标题
  function hightlight (id) {
    document.querySelectorAll(`a.${hightlightName}`)
      .forEach(a => a.classList.remove(hightlightName));
    if (id instanceof HTMLElement) {
      id.classList.add(hightlightName);
      return;
    }
    document.querySelector(`a[href="#${id}"]`).classList.add(hightlightName);
  }
  const links = document.querySelectorAll(`.toc a[href^="#"]`);
  const titles = [];
  for(const link of links) {
    link.addEventListener("click", () => {
      hightlight(link);
    });
    const url = new URL(link.href);
    // 内容中的标题需要放 id 属性
    const dom = document.querySelector(url.hash);
    // 将内容中的标题元素放 titles 中
    if(dom) {
      titles.push(dom);
    }
  }
  // 防抖函数
  function debounce(fn, delay = 100) {
    let timer = null; 
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  }
  const range = 300;
  const scrollHandler = debounce(() => {
    const rects = titles.map(title => {
      return title.getBoundingClientRect();
    });
    for(let i = 0; i < rects.length; i++) {
      const title = titles[i];
      const rect = rects[i];
      // 规定标题出现在 300px 范围内就激活当前标题
      if (rect.top >= 0 && rect.top <= range) {
        hightlight(title.id);
        break;
      }
      // 如果当前标题在顶部不可见，下一个标题超出一定范围或末尾没了，高亮当前标题
      if (rect.top < 0 && (!rects[i + 1] ||rects[i + 1].top > range)) {
        hightlight(title.id);
        break;
      }
    }
  }, 100);
  window.addEventListener("scroll", scrollHandler);
});

</script>
<style scoped lang='less'>
.scroll-of-hight-light {
  display: flex;
  .toc {
    width: 150px;
    position: fixed;
    top: 200px;
    right: 100px;
    z-index: 2000;
    .hightlight {
      color: yellow;
    }
    ul {
      list-style: none;
      .level2 {
        padding-left: 20px;
      }
      .level3 {
        padding-left: 40px;
      }
      .level4 {
        padding-left: 60px;
      }
    }
  }
  .content {
    flex: 1;
  }
  h1 {
    margin-bottom: 600px;
  }
  h2 {
    margin-bottom: 500px;
  }
  h3 {
    margin-bottom: 400px;
  }
  h4 {
    margin-bottom: 30px;
  }
}
</style>