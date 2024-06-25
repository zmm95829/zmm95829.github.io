<template>
  <div ref="container" class="demo1-container">
    <audio controls :src="DemoMusic"></audio>
    <div class="lyric">
      <ul></ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const container = ref();
import DemoMusic from "./命运.mp3";
const demoLyric = `[00:00.18]命运 (Live) - 汪苏泷/张碧晨
[00:02.23]原唱：家家
[00:03.19]词：陈没
[00:03.87]曲：五月天怪兽
[00:05.26]编曲：郭小峰@耳肆山白
[00:07.37]制作人：刘卓@维伴音乐
[00:09.46]音乐总监：刘卓@维伴音乐
[00:10.43]音响总监：何飚
[00:10.63]音乐混音：林梦洋
[00:10.86]鼓：卢炜@维伴音乐
[00:11.09]打击乐：刘效松@维伴音乐
[00:11.42]贝斯：李九君@维伴音乐
[00:11.72]吉他：金天@维伴音乐/崔万平@维伴音乐
[00:12.21]钢琴：傅一峥@维伴音乐
[00:12.51]键盘：李海郡@维伴音乐
[00:13.43]Program：郎梓朔@维伴音乐
[00:13.7]和音编写：石行@维伴音乐
[00:14.03]合音：石行@维伴音乐/马思莹@维伴音乐/邢晏侨@维伴音乐
[00:14.76]录音：黄可爱@维伴音乐
[00:15.05]乐队统筹：张伊然@维伴音乐
[00:20.52]能不能蒙上眼睛 就可以不伤心
[00:27.39]能不能脱下面具 还可以很狠心
[00:34.32]如果不是遇见你 我不可能相信
[00:41.61]生命有一种一定 一定要爱下去
[00:48.12]爱可以相知相许 相依为命
[00:52.25]却听天由命
[00:55.34]爱可以心有灵犀 动魄惊心
[00:59.37]却难以抗拒
[01:01.16]流星的宿命
[01:05.45]我属于 你的注定
[01:09.1]不属于 我的命运
[01:12.8]不要命 不要清醒
[01:16.3]还有梦能紧紧抱着你
[01:19.71]爱写出 我的诗经
[01:23.2]算不出 我的命运
[01:27.06]你给我的命 下一辈子再还你
[01:48.94]如果能如影随形
[01:52.119995]谁愿意一意孤行
[01:55.71]如果能变成蚂蚁
[01:59.06]我愿意趋近于零
[02:02.93]冥冥中明明是你 明明还不死心
[02:09.63]生命是一个谜语 因为你而悬疑
[02:16.34]最初的一心一意 深信不疑
[02:20.48]不能没有你
[02:23.52]最后的情非得已 身不由己
[02:27.56]当物换星移
[02:29.4]今夕是何夕
[02:33.85]我属于 你的注定
[02:37.31]不属于 我的命运
[02:40.93]不要命 不要清醒
[02:44.82]还有梦能紧紧抱着你
[02:47.89]爱写出 我的诗经
[02:51.43]算不出 我的命运
[02:55.29001]你给我的命 下一辈子再还你
[03:12.59]我属于 你的注定
[03:16.14]不属于 我的命运
[03:19.7]不要命 不离不弃
[03:23.45999]暴风雨里静静的运行
[03:26.94]爱写出 我的诗经
[03:30.25]算不出 我的命运
[03:43.42]你借我的命 还给天地还给你
[03:57.47]还给你
[04:06.37]给你`;
/**
 * 将一个时间字符串解析为数字（秒）
 * @param {*} timeStr 时间字符串
 */
function parseTime(timeStr) {
  const parts = timeStr.split(":");
  return +(+parts[0] * 60 + +parts[1]).toFixed(2);
}

function getLyricArray(lrc = demoLyric) {
  const lines = lrc.split("\n");
  const re = [];
  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split("]");
    re.push({
      time: parseTime(parts[0].substring(1)),
      words: parts[1]
    });
  }
  return re;
}

onMounted(() => {
  const doms = {
    audio: container.value.querySelector("audio"),
    ul: container.value.querySelector("ul"),
    lyric: container.value.querySelector(".lyric")
  };
  const lrcData = getLyricArray();
  function findIndex(audioDom) {
    const curTime = audioDom.currentTime;
    for (let i = 0; i < lrcData.length; i++) {
      if (curTime < lrcData[i].time) {
        return i - 1;
      }
    }
    //找遍了都没找到（说明播放到最后一句
    return lrcData.length - 1;
  }
  function createLrcElements(ulDom) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < lrcData.length; i++) {
      const li = document.createElement("li");
      li.textContent = lrcData[i].words;
      frag.appendChild(li);
    }
    ulDom.appendChild(frag);
  }
  console.log(getLyricArray());

  createLrcElements(doms.ul);
  // 歌词容器高度
  const containerHeight = doms.lyric.clientHeight;
  // li 的高度
  const liHeight = doms.ul.children[0].clientHeight;
  console.log(containerHeight, liHeight);
  const maxOffset = doms.ul.clientHeight - doms.lyric.clientHeight;
  function setOffset() {
    const index = findIndex(doms.audio);
    console.log(333333333333, index)
    let offset = liHeight * index + liHeight / 2 - containerHeight / 2;
    if (offset < 0) {
      offset = 0;
    }
    if (offset > maxOffset) {
      offset = maxOffset;
    }
    doms.ul.style.transform = `translateY(-${offset}px)`;
    let li = doms.ul.querySelector(".active");
    if (li) {
      li.classList.remove("active");
    }
    li = doms.ul.children[index];
    if (li) {
      li.classList.add("active");
    }
  }
  doms.audio.addEventListener("timeupdate", setOffset);
});
</script>
<style lang='less'>
.demo1-container {
  background: #000;
  color: #fff;
  text-align: center;
  padding: 20px;
  audio {
    margin: 20px auto;
  }
  .lyric {
    height: 300px;
    overflow: hidden;
    ul {
      list-style: none;
      transition: all 0.3s;
      margin: 0;
      padding: 0;
    }
    li {
      color: #bebcbc;
      margin: 0;
      height: 2em;
      line-height: 2em;
      transition: all 0.3s;
    }
    .active {
      color: #fff;
      transform: scale(1.5);
    }
  }
}
</style>