<template>
  <div ref="containerRef" class="scroll-of-horizontal">
    <div class="scroll-container">
      <div class="content">
        <img
          v-for="item in images"
          :key="item"
          :src="item"
          />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
const images = [
  "/images/test1.jfif",
  "/images/test2.jfif",
  "/images/test3.jfif",
  "/images/test4.jfif",
];
const containerRef = ref();
const size = reactive({
  w: 0,
  h: 0
})
onMounted(() => {
  // 可以使用监听元素高宽变化后复制
  console.log(containerRef.value)
  size.w = containerRef.value.clientWidth;
  size.h = containerRef.value.clientHeight;
  console.log(size)
})
</script>
<style scoped lang='less'>
.scroll-of-horizontal {
  width: 100%;
  height: 300px;
  background-color: skyblue;
}
.scroll-container {
  --w: calc(v-bind(size.w) * 1px);
  --h: calc(v-bind(size.h) * 1px);
  width: var(--h);
  height: var(--w);
  overflow-y: auto;
  background-color: pink;
  position: relative;
  transform-origin: left top;
  transform: translateY(var(--h)) rotate(-90deg);
  &::-webkit-scrollbar {
    display: none;
  }
  .content {
    width: var(--w);
    height: var(--h);
    position: absolute;
    top: 0;
    display: flex;
    left: var(--h);
    transform: rotate(90deg);
    transform-origin: left top;
    img {
      height: var(--h);
      width: var(--h);
    }
  }
}
</style>