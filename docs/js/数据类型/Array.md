##  Array.prototype.includes(search[, fromIndex])

是否包含某元素

返回布尔值

```js
const arr = [ 'es6', NaN, 'es8', 'es9' ]
arr.includes("es8") // true
arr.includes("es8", 2) // true
arr.includes("es8", 3) // false
arr.includes("es8", -1) // false
arr.includes("es8", -2) // true
arr.includes(NaN) // true
```



## Array.prototype.push/unshift(value[, ....])

push：向数组的末尾添加元素，返回新数组长度

unshift：向数组的**开头**添加元素，返回新数组长度

```js
const arr = [1, 2];
arr.push(4, 5); // 4
console.log(arr); // [1, 2, 4, 5]

// 在非数组对象中使用 push()
const plainObj = {};
Array.prototype.push.call(plainObj, 1, 2); // 2
console.log(plainObj); // { '0': 1, '1': 2, length: 2 }
```

## Array.prototype.concat(arr1[, ...])

将两个或多个数组合并为一个新数组，返回新数组

```js
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
arr1.concat(arr2); // [1, 2, 3, 4]
arr1.concat(arr2, arr3); // [1, 2, 3, 4, 5, 6]
```

## Array.prototype.find()

快速生成1-10的数组

```js
// 0-9 数组
[...new Array(10).keys()] // 或者
Array.from(Array(10), (v, k) => k)

// 1-10 数组
[...Array(10)].map((v, i) => i + 1)

```

快速生成10个[]的二维数组

```js
// 10 个 8 数组
new Array(10).fill(0)

// 错误写法
const arr = new Array(10).fill([]) // 注意这是错误写法，不要这么写
// 正确写法
const arr = new Array(10).fill().map(() => new Array())
```

数组降维

```js
const arr = [1, [2, [3, 4], 5], 6]
const flatArr = arr.flat(Infinity) // [1, 2, 3, 4, 5, 6]

// map 之后降维
const arr = [1, 2, 3, 4]
const result = arr.map(v => [v, v * 2]).flat() // [1, 2, 2, 4, 3, 6, 4, 8]
// 可以简写为：
arr.flatMap(v => [v, v * 2])
```

删除重复项

```js
const numbers = [1, 1, 20, 3, 3, 3, 9, 9];
const uniqueNumbers = [...new Set(numbers)]; // -> [1, 20, 3, 9]
```

