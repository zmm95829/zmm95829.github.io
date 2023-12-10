<template>
  <div class="filter-index">
    <div v-for="(group, index) in list" :key="index" class="filter-index-group">
      <div class="filter-index-group-title">{{ index + 1 }}、{{ group.title }}</div>
      <div class="filter-index-group-items">
        <div v-for="(item, subIndex) in group.items" :key="subIndex" class="filter-index__item">
          <svg v-bind="svgData" :style="{filter: item}">
            <path v-bind="pathData" />
          </svg>
          <span>{{ item || "无" }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FilterIndex",
  data: function() {
    return {
      svgData: {
        t: "1699658662031",
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "997",
        width: "100",
        height: "100"
      },
      pathData: {
        d:
          "M927.6416 183.9616a30.72 30.72 0 0 0-33.8432 8.192c-27.136 30.2592-63.1808 22.4768-83.3536 14.4384v-35.84a30.72 30.72 0 0 0-16.1792-27.0336c-178.1248-95.8976-349.7472-57.4464-428.4928-30.208V97.28a30.72 30.72 0 0 0-30.72-30.72H231.2192a30.72 30.72 0 0 0-30.72 30.72v686.08h-87.04a30.72 30.72 0 0 0-30.72 30.72v107.52a30.72 30.72 0 0 0 30.72 30.72h339.456a30.72 30.72 0 0 0 30.72-30.72v-107.52a30.72 30.72 0 0 0-30.72-30.72h-87.04v-117.248c78.2848-34.2528 168.2432-38.0416 243.3536-31.8464v53.76a30.72 30.72 0 0 0 18.5856 28.2112c55.7056 24.0128 103.7824 32.8704 144.3328 32.8192 110.2848 0 165.3248-65.28 168.3968-69.0176A30.72 30.72 0 0 0 947.2 660.48V212.6336a30.72 30.72 0 0 0-19.5584-28.672zM422.1952 890.88H144.0768v-46.08h278.1184z m-160.256-107.52V128h42.3936v655.36z m103.8336-183.3472V179.2c51.8656-20.48 215.04-71.68 383.232 10.24v405.0432c-74.5472-18.1248-238.7968-47.0528-383.232 5.4784zM885.76 648.0384c-20.992 18.7392-90.2144 66.0992-215.3984 19.2512v-25.6a756.992 756.992 0 0 1 98.2528 21.9136l1.3824 0.4608a31.8464 31.8464 0 0 0 12.7488 1.28 31.2832 31.2832 0 0 0 14.848-5.632 31.8464 31.8464 0 0 0 4.352-3.9424l0.9728-1.024a30.72 30.72 0 0 0 7.3216-19.9168V270.7456a140.3392 140.3392 0 0 0 75.52-1.8944z",
        fill: "red",
        "p-id": "998"
      },
      list: [
        {
          title: "grayscale()：将图像转为灰度图，0%无变化，100%完全变灰",
          items: ["", "grayscale(0)", "grayscale(0.5)", "grayscale(1)"]
        },
        {
          title: "blur()：模糊图像，0 无影响，值越大越模糊",
          items: ["", "blur(0)", "blur(5px)", "blur(10px)"]
        },
        {
          title: "brightness()：让图像更明亮或更暗淡，0%全黑，100%无影响，大于100%更加明亮",
          items: ["", "brightness(0)", "brightness(0.4)", "brightness(0.8)", "brightness(1)"]
        },
        {
          title: "contrast()：增加或减少图像的对比度，0%是变灰，100%无影响，超过100%增强对比度",
          items: ["", "contrast(0)", "contrast(40%)", "contrast(100%)"]
        },
        {
          title: "drop-shadow()：沿图像的轮廓生成阴影效果，阴影语法类似于 <box-shadow>，但不允许使用 inset 关键字以及 spread 参数。drop-shadow(x偏移, y偏移, 模糊大小, 色值)",
          items: ["", "drop-shadow(0px 0px 10px blue)", "drop-shadow(16px 16px 20px blue)", "drop-shadow(36px 36px 30px blue)"]
        },
        {
          title: "hue-rotate()：改变图像的整体色调，0deg则无变化，大于360deg相当于又绕了一圈",
          items: ["", "hue-rotate(0deg)", "hue-rotate(45deg)", "hue-rotate(90deg)", "hue-rotate(-45deg)"]
        },
        {
          title: "invert()：反转图像颜色，0%无变化，100%完全反转",
          items: ["", "invert(0deg)", "invert(45%)", "invert(80%)", "invert(100%)"]
        },
        {
          title: "opacity()：改变透明度，0%完全透明，100%无变化",
          items: ["", "opacity(0)", "opacity(45%)", "opacity(80%)", "opacity(100%)"]
        },
        {
          title: "saturate()：改变饱和度，0%完全不饱和，100%无变化，超过100%增加饱和度",
          items: ["", "saturate(0)", "saturate(45%)", "saturate(100%)", "saturate(150%)"]
        },
        {
          title: "sepia()：转换为深褐色，0%无变化，100%完全深褐色",
          items: ["", "sepia(0)", "sepia(45%)", "sepia(100%)", "sepia(100%)"]
        }
      ]
    };
  }
};
</script>
<style scoped lang="less">
.filter-index-group-title {
  font-size: 16px;
  font-weight: 600;
  background-color: skyblue;
}
.filter-index-group-items {
  display: flex;
  flex-wrap: wrap;
  .filter-index__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
  }
}
</style>
