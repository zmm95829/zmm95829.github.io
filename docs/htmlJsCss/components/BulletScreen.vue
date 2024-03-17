<template>
  <div class="container" style="--t: 20s">
    <div class="first">
      <span v-for="index in 10" :key="index">评论{{ index }}</span>
    </div>
    <div class="second">
      <span v-for="index in 10" :key="index">评论{{ index }}</span>
    </div>
  </div>
  <div class="container" style="--t: 50s">
    <div class="first">
      <span v-for="index in 10" :key="index">评论{{ index }}</span>
    </div>
    <div class="second">
      <span v-for="index in 10" :key="index">评论{{ index }}</span>
    </div>
  </div>
  <div class="container" style="--t: 40s">
    <div class="first">
      <span v-for="index in 10" :key="index">评论{{ index }}</span>
    </div>
    <div class="second">
      <span v-for="index in 10" :key="index">评论{{ index }}</span>
    </div>
  </div>
</template>

<script setup>
</script>
<style scoped lang='less'>
.container {
  mask-image: linear-gradient(
    90deg, transparent, #fff 20%, #fff 80%, transparent
  );
  overflow: hidden;
  display: flex;
  background-color: #000;
  > div {
    white-space: nowrap;
    &.first {
      animation: move1 var(--t) linear infinite;
    }
    &.second {
      animation: move2 var(--t) linear infinite;
      animation-delay: calc(var(--t) * -0.5)
    }
  }
  span {
    letter-spacing: 0.2em;
    border-radius: 4px;
    padding: 2px 5px;
    background-color: #333;
    color: #fff;
    margin: 10px;
    display: inline-flex;
  }
}
@keyframes move1 {
  from {
    transform: translate(100%);
  }
  to {
    transform: translate(-100%);
  }
}
@keyframes move2 {
  from {
    transform: translate(0%);
  }
  to {
    transform: translate(-200%);
  }
}
</style>