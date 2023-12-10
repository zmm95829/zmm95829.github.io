<template>
  <div ref="fullScreen" class="full-screen">
    <div class="full-screen-btn" @click="toggleFullScreen($refs.fullScreen)">{{ isFull ? "退出全屏" : "全屏" }}</div>
  </div>
</template>
<script>
import { onMounted, ref, onBeforeUnmount } from "vue";
export default {
  name: "FullScreen",
  setup() {
    const isFull = ref(false);

    // 检测是否全屏
    function isFullScreen() {
      const isTrue =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
      return !!isTrue;
    }
    // 全屏/退出全屏切换
    function toggleFullScreen(el) {
      if (isFullScreen()) {
        toCancelFullScreen();
      } else {
        toRequestFullScreen(el);
      }
    }
    // 退出全屏
    function toCancelFullScreen() {
      const el = document;
      const eventEnter =
        el.exitFullscreen ||
        el.webkitCancelFullScreen || // 或者 webkitExitFullscreen
        el.mozCancelFullScreen ||
        el.msExitFullscreen;
      eventEnter?.call(el);
    }
    // 全屏
    function toRequestFullScreen(el = document.documentElement) {
      const eventEnter =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;
      eventEnter?.call(el);
    }

    // 使用监听，避免 esc 或者 f11 退出全屏没法监测
    function fullscreenchange() {
      isFull.value = !isFull.value;
    }
    onMounted(() => {
      if (
        !document.fullscreenEnabled &&
        !document.webkitFullscreenEnabled &&
        !document.mozFullScreenEnabled &&
        !document.msFullscreenEnabled
      ) {
        alert("当前浏览器不支持全屏模式！");
      }
      document.addEventListener("fullscreenchange", fullscreenchange);
      document.addEventListener("webkitfullscreenchange", fullscreenchange);
      document.addEventListener("mozfullscreenchange", fullscreenchange);
      document.addEventListener("MSFullscreenChange", fullscreenchange);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("fullscreenchange", fullscreenchange);
      document.removeEventListener("webkitfullscreenchange", fullscreenchange);
      document.removeEventListener("mozfullscreenchange", fullscreenchange);
      document.removeEventListener("MSFullscreenChange", fullscreenchange);
    });
    return {
      isFull,
      toggleFullScreen
    }
  }
};
</script>
<style scoped lang="less">
.full-screen {
  background-color: #fff;
}
.full-screen-btn {
  cursor: pointer;
}
</style>
