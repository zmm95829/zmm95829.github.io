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

