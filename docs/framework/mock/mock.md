# vite 中使用 mock

1. 安装依赖：`yarn add mockjs vite-plugin-mock -D`
   vite-plugin-mock 版本3有问题，mock 目录下会自动生成一些文件

2. vite.config.js 下
   ```js
   import { viteMockServe } from "vite-plugin-mock";
   
   export default ({ mode }) => {
       return {
           plugins: [
             viteMockServe({
               mockPath: "/mock",
               localEnabled: mode === "mock"
             })
           ],
       }
   }
   ```

3. package.json 中添加命令
   ```json
   {
       "scripts": {
       	"mock": "vite --mode mock --open false",
    	 }
   }
   ```

4. 根目录下添加 .env.mock，设置 axios 拦截中添加的前缀
   ```js
   VITE_PREFIX=/mock
   ```

5. 跟目录下添加 mock 文件夹，新建 index.js

   ```js
   const VITE_PREFIX = "/mock";
   export default [
     {
       url: `${VITE_PREFIX}/code`,
       method: "get",
       response: () => {
         return {
           data: {
             img: "xxxx"
           }
         };
       }
     }
   ]
   ```

6. 执行命令时使用 `yarn mock`

# mock 假数据

```js
const mockjs = require("mockjs");
// 返回一个对象，里面有个属性叫 data，data 中有 100 条数据
const userList = mockjs.mock({
    "data|100": [{
        name： "@cname", // 中文名
        ename： mockjs.Random.name(), // 英文名
        "id++1": 1, // 每个 id 累加 1
        time: "@time"
    }]
})
module.exports = [
  {
    url: "/user/list",
    method: "get",
    response: () => {
      return {
        data: userList
      };
    }
  }
]
```

