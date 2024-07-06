<template>
  <div class="demo2-container">
    <div class="fix-btn" :class="isScrolling ? 'scrolling' : ''"></div>
    <div ref="scrollDom" class="content-container">
      <div class="content"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isScrolling = ref(true)
const scrollDom = ref();
onMounted(() => {
  let timer;
  scrollDom.value.addEventListener('scroll', function(){
    // 是否在滚动
    isScrolling.value = true
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      isScrolling.value = false
    }, 150)
  })
})

</script>

<style scoped lang='less'>
.demo2-container {
  position: relative;
  .content-container {
    height: 300px;
    overflow-y: auto;
    background-color: skyblue;
    .content {
      height: 900px;
    }
    /* 针对WebKit浏览器的自定义滚动条样式 */
    &::-webkit-scrollbar {
        width: 8px; /* 滚动条宽度 */
        height: 8px; /* 横向滚动条高度 */
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5); /* 滚动条颜色 */
        border-radius: 4px; /* 滚动条圆角 */
    }

    &::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.1); /* 滚动条轨道颜色 */
    }
  }
  .fix-btn {
    position: absolute;
    bottom: 30px;
    right: 30px;
    background-color: pink;
    width: 60px;
    height: 60px;
    border-radius: 10px;
    transition: all 0.3s;
    &.scrolling {
      right: 8px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      width: 20px;
    }
  }
}
</style>