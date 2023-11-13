<template>
  <div class="auto-toc-scroll">
    <h1>一级标题</h1>
    <h2>二级标题</h2>
    <h3>三级标题</h3>
    <h4>四级标题</h4>
    <h1>一级标题</h1>
    <h2>二级标题</h2>
    <h3>三级标题</h3>
    <h4>四级标题</h4>
    <h1>一级标题</h1>
    <h2>二级标题</h2>
    <h3>三级标题</h3>
    <h4>四级标题</h4>
    <h1>一级标题</h1>
    <h2>二级标题</h2>
    <h3>三级标题</h3>
    <h4>四级标题</h4>
  </div>
</template>
<script>
import { onMounted } from "vue";

export default {
  name: "AutoTocScroll",
  setup() {
    onMounted(() => {
      // 1. 获取所有标题，生成大纲并放入页面上显示
      const parentEl = document.querySelector(".auto-toc-scroll");
      const tocList = parentEl.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const headerLevel = ["H1"];

      const ulEl = document.createElement("ul");
      ulEl.className = "auto-toc-container";
      Array.from(tocList, (item, index) => {
        const id = item.getAttribute("id");
        if (!id) {
          item.setAttribute("id", "auto-toc-item" + "_hid-" + index);
        }
        const level = item.nodeName.slice(-1);
        const liEl = document.createElement("li");
        liEl.setAttribute("class", `auto-toc-item item-level--${level} ${item.getAttribute("id")}`);
        liEl.setAttribute("style", `padding-left: ${level * 12}px`);
        liEl.textContent = item.textContent;
        ulEl.appendChild(liEl);

        // 2. 点击目录滚动到指定位置
        liEl.addEventListener("click", (e) => {
          addActiveClass(ulEl.querySelector(".auto-toc-item." + item.getAttribute("id")));
          window.scrollTo({
            top: item.offsetTop - 40,
            behavior: "smooth"
          });
        });
      });
      parentEl.appendChild(ulEl);

      // 3. 监听滚动
      function addActiveClass(addClassEl) {
        removeActiveClass();
        addClassEl?.classList.add("active");
      }
      function removeActiveClass() {
        ulEl.querySelector(".auto-toc-item.active")?.classList.remove("active");
      }
      let timer = null;
      const clientHeight = document.documentElement.clientHeight / 2;
      function setActiveToc() {
        let activeIndex = tocList.length - 1;
        for (let i = 0; i < tocList.length; i++) {
          const item = tocList[i];
          const elTop = item.getBoundingClientRect().top;
          if (elTop > 0) {
            if (elTop > clientHeight) {
              activeIndex = i - 1;
            } else {
              activeIndex = i;
            }
            break;
          }
        }
        addActiveClass(
          ulEl.querySelector(".auto-toc-item." + tocList[activeIndex].getAttribute("id"))
        );
      }
      window.addEventListener("scroll", () => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          setActiveToc();
        }, 60);
      });
      setTimeout(() => {
        if (!timer) {
          // 这时候在顶部
          addActiveClass(ulEl.querySelector(".auto-toc-item." + tocList[0].getAttribute("id")));
        }
      }, 60);
    });
  }
};
    