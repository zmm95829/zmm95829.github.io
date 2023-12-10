<template>
  <div>
    <svg width="230" height="120" xmlns="http://www.w3.org/2000/svg">
      <filter id="blurMe">
        <feGaussianBlur stdDeviation="5" />
      </filter>
      <circle cx="60" cy="60" r="50" fill="green" />

      <circle cx="170" cy="60" r="50" fill="green" filter="url(#blurMe)" />
    </svg>
  </div>
</template>
<script>
export default {
  name: "Filter1"
};
</script>
<style scoped lang="less">
</style>
