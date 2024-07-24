<template>
  <div class="animation-height">
    <div class="demo1 demo">
      <el-button>auto 无过渡效果</el-button>
      <div class="desc1 desc">
        {{ desc }}
      </div>
    </div>
    <div class="demo2 demo">
      <el-button>max-height 效果不佳</el-button>
      <div class="desc2 desc">
        {{ desc }}
      </div>
    </div>
    <div class="demo3 demo">
      <el-button>scaleY 有挤压</el-button>
      <div class="desc3 desc">
        {{ desc }}
      </div>
    </div>
  </div>
  <div class="animation-height">
    <div class="demo4 demo">
      <el-button>grid fr 有兼容性</el-button>
      <div class="desc4 desc">
        {{ desc }}
      </div>
    </div>
    <div class="demo5 demo">
      <el-button>js 设置 height 具体值</el-button>
      <div class="desc5 desc">
        {{ desc }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
const desc = "《古诗三百首》收集了先秦两汉诗、魏晋南北朝诗、宋诗、辽金元诗、明诗、清诗/近代诗等300首经典古诗词。"
onMounted(() => {
  // demo5 使用 js 实现
  const btn = document.querySelector(".demo5 button");
  const desc = document.querySelector(".demo5 .desc")
  btn.onmouseenter = () => {
    desc.style.height = "auto";
    // 设置显示，然后获取内容高度
    const { height } = desc.getBoundingClientRect();
    desc.style.height = 0;
    // 需要强制回流，绘制从 0 开始
    desc.getBoundingClientRect();
    desc.style.height = height + "px";
  }
  btn.onmouseleave = () => {
    desc.style.height = 0;
  }
})
</script>
<style scoped lang='less'>
.animation-height {
  height: 150px;
  display: flex;
  > div {
    flex: 1;
  }
  .demo {
    position: relative;
    .desc {
      position: absolute;
      margin-top: 5px;
      width: 220px;
      box-shadow:  inset 0 -3em 3em rgba(0, 0, 0, 0.1),
      0 0 0 2px rgb(255, 255, 255),
      0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
      overflow: hidden;
    }
  }
  // 以下是不同的样式
  .desc1 {
    height: 0;
    transition: 0.5s;
  }
  .demo1 button:hover~.desc1 {
    height: auto;
  }

  .desc2 {
    max-height: 0;
    transition: 2s;
  }
  .demo2 button:hover~.desc2 {
    max-height: 2000px;
  }

  .desc3 {
    transform-origin: center top;
    transform: scaleY(0);
    transition: 0.2s;
  }
  .demo3 button:hover~.desc3 {
    transform: scaleY(1);
  }

  .desc4 {
    display: grid;
    grid-template-rows: 0fr;
    transition: 0.2s;
  }
  .demo4 button:hover~.desc4 {
    grid-template-rows: 1fr;
  }
  .desc5 {
    height: 0;
    transition: 0.2s;
  }
}
</style>