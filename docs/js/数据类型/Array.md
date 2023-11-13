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

