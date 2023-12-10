[参考1](https://mp.weixin.qq.com/s/w8YtRaoJy-BVRAAxKmw_UA)

## ES2016

- Array.prototype.includes(search[, fromIndex])
- 幂运算符 ** ：2 ** 10 = Math.pow(2, 10) 

## ES2017

- async / await

- Object.values()

- Object.entries()

- Object.getOwnPropertyDescriptors()

- String.prototype.padStart() / String.prototype.padEnd()

- 尾逗号扩展：函数定义和调用的时候，在参数结尾位置添加一个逗号而不报错
  ```js
  function fn(a, b, c,) {}
  fn(a, b, c,)
  ```

## ES2018

- 异步扩展 : for await of

- Promise.prototype.finally()
- 对象的扩展运算符 : ...
- 正则扩展 : dotAll 模式、具名组匹配

## ES2019

- Array.prototype.flat()
- Array.prototype.flatMap()
- Object.fromEntries()
- String.prototype.trimStart()、String.prototype.trimEnd()
- Symbol.prototype.description
- JSON Superset 超集
- JSON.stringify 加强格式转化
