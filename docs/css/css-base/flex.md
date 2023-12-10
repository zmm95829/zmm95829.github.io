# 场景

## 让某个元素固定在右侧

```html
<style>
    .parent {
      background-color: pink;
      display: flex;
    }
    .center {
      flex: 1;
      text-align: center;
      background-color: skyblue;
    }
</style>
<div class="parent">
    <div class="left">左边</div>
    <div class="center">中间</div>
    <div class="right">右边</div>
</div>
```

正常情况下，左右宽度一定，中间宽度自适应，这样可以让左右一直固定在左边和右边

当左侧与中间内容，脱离文档流或者不进行渲染时，会导致右边内容渲染在了左边

需求是固定渲染在右侧

方案一：给 right 添加如下样式

```
flex: 1;
text-align: right;
```

当左侧与中间的内容变化不确定时机时，没法这么设置，这时候建议使用方案二

方案二：给 right 加如下样式

```
margin-left: auto;
```

