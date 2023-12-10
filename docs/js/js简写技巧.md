[运算符详解看这里](./运算符)



# if 判断或者运算符相关



## ||、?? 代替 if else

逻辑或操作符 a || b：若 a 是 falsy 的值，就返回 b；否则返回 a。falsy 的值包括：0，""，null，undefined，NaN，false

```js
val2 = val1 || {};
// 等价于
if (val1) {
    val2 = {};
} else {
    val2 = val1;
}
// 等价于
if (val1 === 0 || val1 === "" || val1 === null || val1 === undefined || val1 === NaN || val1 === false) {
    val2 = {};
} else {
    val2 = val1;
}
```

空值合并操作符 a ?? b：若 a 是 null 或者 undefined，就返回 b；否则返回 a。

```js
val2 = val1 ?? {};
// 等价于
if (val1 === undefined || val1 === null) {
    val2 = {};
} else {
    val2 = val1;
}
```

## 三元运算符代替 if、else

```js
val = flag === "1" ? "a" : "b";
// 等价于
if (flag === 1) {
    val = "a";
} else {
    val = "b";
}
```

## swich case 代替多个 else if

```js
switch(type) {
    case 1:
        val = "a";
        break;
    case 2: 
        val = "b";
        break;
    case 3:
        val = "c";
        break;
    case 4:
        val = "d";
        break;
    default:
        val = "z";
}
// 等价于
if (type === 1) {
    val = "a";
} else if(type === 2) {
    val = "b";
} else if(type === 3) {
    val = "c";
} else if(type === 4) {
    val = "d";
} else {
    val = "z";
}
```

## 对象的 key value 翻译代替多个 else if

```js
valueMap = {
    1: "a",
    2: "b",
    3: "c",
    4: "d"
};
val = valueMap[type] || "z";
```

##  map 的 get 翻译代替多个 else if

```js
valueMap = new Map([
    [1, "a"],
    [2, "b"],
    [3, "c"],
    [4, "d"]
])
val = valueMap.get(type) || "z";
```



## includes 代替多个带有||的if

```js
if (["a", "b", "c", "d"].includes(val)){}
// 等价于
if (val === "a" || val === "b" || val === "c" || val === "d") {}
```

## ?. 代替 &&

```js
if (val?.obj?.key){}
// 等价于
if (val && val.obj && val.obj.key){}
```

## ??= 代替空判断后的赋值

```js
val ??= 5;
// 等价于
if (val === null || val === undefined) {
    val = 5;
}
```

## 逗号运算符简化 return

```js
const result = arr => (arr.push("my"), arr);
result(["1", "2"]); //  ["1", "2", "my"]
// 等价于
const result = arr => {
  arr.push("my");
  return arr;
}
result(["1", "2"]); //  ["1", "2", "my"]
```

# 函数



# 其他

## 没有第三个变量的情况下交换两个变量

```js
let x = "a";
let y = "b";

// 交换变量
[x, y] = [y, x];
```

