<template>
  <div class="filter3-index">
    我是文字
    <div class="glass-container">
      <div class="glass glass-by-filter" />
      <div class="glass glass-by-backdrop-filter" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Filter3",
  data: function() {
    return {};
  }
};
</script>
<style scoped lang="less">
.filter3-index {
  font-size: 30px;
  background-color: skyblue;
  width: 500px;
  height: 300px;
  padding: 100px 180px;
  position: relative;
}
.glass-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .glass {
    width: 200px;
    height: 200px;
    border: 1px groove #efefef;
    border-radius: 12px;
    background: rgba(242, 242, 242, 0.5);
    box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
      0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
      0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
    &.glass-by-filter {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        // 主要是 background 和 filter
        background: inherit;
        filter: blur(10px);
      }
    }
    &.glass-by-backdrop-filter {
      backdrop-filter: blur(2px);
    }
  }
}
</style>
