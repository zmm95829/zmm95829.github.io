
# 细节

参考： https://juejin.cn/post/7134594122391748615

## link标签动态引入

<demo src="./components/Link.vue"></demo>

思路：

- 不同主题放不同的 css 文件中，切换时，更换在 link 标签的引入路径
- 初始化时，给加载一个默认的样式文件

特点：

- 首屏非全量加载样式-按需加载，动态加载样式文件，切换可能会卡顿



## 提前引入所有主题样式，做类名切换

<demo src="./components/ToggleClass.vue"></demo>

思路：

- 切换主题样式时，给根元素（比如说 html、 body）切换不同的样式名
- 在样式文件中，不同根样式名下定义不同的样式

特点：

- 首屏全量加载样式，切换不会卡顿

## CSS变量+类名切换

<demo src="./components/ToggleClassAndCssVariable.vue"></demo>

思路：

- 切换主题样式时，给根元素（比如说 html、 body）切换不同的样式名
- 在不同的根类名下定义不同的 [css 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 值，定义元素样式的时候，值使用变量名

特点：

- 首屏全量加载样式，切换不会卡顿

## mixin + 类名切换

[css 预处理器使用参考](/css/css-preprocessor/预处理器使用对比)

<demo src="./components/PreprocessorMixin.vue"></demo>
