<template>
  <div class="text-hollow-out">
    <div class="modal">
      <h1>文字镂空效果</h1>
    </div>
  </div>
</template>

<script setup>

</script>
<style scoped lang='less'>
.text-hollow-out {
  --bg: url(/images/test4.jfif) no-repeat center;
  height: 400px;
  background: var(--bg);
  background-size: cover;

  .modal {
    width: 100%;
    height: 100%;
    background: rgba(0, 0 , 0, 0.7);
    color: #fff;

    h1 {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 6vw;
      // 文字描边
      -webkit-text-stroke: 1px #fff;
      // 文字背景
      background: var(--bg);
      background-clip: text;
      color: transparent;
    }
  }

}
</style>