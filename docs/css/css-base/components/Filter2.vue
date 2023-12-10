<template>
  <div class="filter2-index">
    <div class="button">🍋</div>
    <div class="button">🍎</div>
    <div class="button">🍐</div>
    <div class="button dark">🍋</div>
    <div class="button dark">🍎</div>
    <div class="button dark">🍐</div>
  </div>
</template>
<script>
export default {
  name: "Filter2",
  data: function() {
    return {};
  }
};
</script>
<style scoped lang="less">
.filter2-index {
  div {
    padding: 10px;
    background: #ddd;
    border-radius: 3px;
    display: inline-block;
    margin: 20px;
    cursor: pointer;
    &.dark {
      background-color: #333;
    }
    &:hover {
      filter: brightness(110%) saturate(140%);
    }
  }
}
</style>
