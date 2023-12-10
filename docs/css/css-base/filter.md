

> https://mp.weixin.qq.com/s/kZKtIONNt0jNMYVQnv2QCw
## filter 介绍

```
filter: <filter-function> [<filter-function>]* | none
filter: url(file.svg#filter-element-id)

```

### filter: filter-function

<demo src="./components/Filter.vue"></demo>

### filter: url(file.svg#filter-element-id)

svg dom 上定义 filter 节点，在别的节点上使用 id 引用

<demo src="./components/Filter1.vue"></demo>

## backdrop-filter 介绍

https://www.51cto.com/article/697091.html

|            | filter                                           | backdrop-filter                                              |
| ---------- | ------------------------------------------------ | ------------------------------------------------------------ |
| 兼容性     |                                                  | 火狐系列的兼容较晚（2022年）                                 |
| 作用的元素 | 作用于当前元素，并且它的后代元素也会继承这个属性 | 作用于元素背后的所有元素，为了看到效果，必须使元素或其背景至少部分透明 |
| 使用       |                                                  | 很容易产生毛玻璃效果                                         |

相同：

- 使用方式与可能值是一致的
- 作用了 filter 和 backdrop-filter 的元素(值不为 none)，都会生成 Backdrop Root【堆叠上下文Stacking Context】，使 CSS 3D失效变为 2D
- 作用了 filter 和 backdrop-filter 的元素会使内部的 fixed 定位失效：position：fixed退化为 position：absolute。
  总结一下，以下情况会使 fixed 失效：
  - transform 属性值不为 none 的元素
  - 设置了 transform-style: preserve-3d 的元素
  - perspective 值不为 none 的元素
  - 在 will-change 中指定了任意 CSS 属性
  - 设置了 contain: paint
  - filter 值不为 none 的元素
  - backdrop-filter 值不为 none的元素

## 常见应用

### 元素、网页置灰

发生重大灾害事故或其他哀悼日时，国企政府网站往往有网页全部置灰的需求

```
.gray {
  filter: grayscale(100%);
}
```

将 gray 添加到需要置灰的元素上即可

为了兼容 IE8 等其他低版本浏览器，可以加上浏览器前缀和 svg 滤镜
```
.gray {
  -webkit-filter: grayscale(1);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: url("data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"grayscale\"><feColorMatrix type=\"matrix\" values=\"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\"/></filter></svg>#grayscale");
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  filter: grayscale(100%);
}
```

如果上架置灰后到底预计时间自动撤掉，可以写个判断
```
(function setGray() {
  var endTime = Date.parse("Apr 06 2077 00:00:01");
  var timestamp = Date.parse(new Date());
  if (timestamp <= endTime) {
    document.querySelector('html').classList.add('gray');
  }
})();
```

### 更加智能的阴影效果

box-shadow(x偏移, y偏移, 模糊大小, 阴影大小, 色值, inset)：给透明图片添加阴影效果时，无法穿透元素，只能添加到透明图片元素的盒模型上

filter: drop-shadow(x偏移, y偏移, 模糊大小, 色值)：能很好的解决这个问题，用它添加的阴影可以穿透元素，而不是添加到元素的盒模型边框上

### 元素强调、高亮

改变 brightness 亮度 和 saturate 饱和度

<demo src="./components/Filter2.vue"></demo>

### 毛玻璃效果

左侧是 filter，右侧是 backdrop-filter

<demo src="./components/Filter3.vue"></demo>

### 节省空间，提高网页加载速度

同一图片减小亮度和对比度及色相饱和度之后的体积与原图相比，可以减小很大一部分体积空间 2M 左右的图片经过弱化后保存，就可以压缩到 1M 左右。在网页中我们可以使用经过弱化的图片，然后通过 CSS filter 将其还原。这样就可以达到压缩资源体积，提升网页加载速度、提高用户体验的目的。