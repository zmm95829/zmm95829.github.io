未整理-参考：[Vite介绍及实现原理](https://zhuanlan.zhihu.com/p/424842555)

# vite 是啥

vite = dev server + 生产构建

- dev server：利用浏览器的 EMS 能力，直接运行代码并具 HMR 功能，不需要先打包再运行
- 生产构建：利用 Rollup 工具进行编译打包

## vite 脚手架和 vite

`yarn create vite`、```yarn create vite my-vue-app --template vue```

- 安装 vite 的脚手架 create-vite
- 运行脚手架中 bin 下的执行配置

create-vite 内置了 vite





## 开发环境

### 依赖预构建

找依赖：从当前目录依次向上查找，直到找到根目录或者搜寻到对应结果为止

依赖预构建：找到对应依赖，调用 esbuild，将其他规范的代码转换为 esm 规范，然后放到 node_modules/.vite/deps，同时对 esm 规范的各个模块进行统一集成 

解决了：

- 不同第三方包有不同的导出格式
- 对路径的处理上可以直接使用.vite/deps，方便路径重写
- 网络多包传输的性能问题（也是原生 esm 规范不敢支持 node_modules 的原因之一），有了依赖预构建后无论多少个 import、export 都会尽可能的将内容集成成一个文件

vite.config.js 中 

```js
{
    optimizeDeps: {
 		exclude: ["lodash-es"] // 遇到 lodash-es 时 ，不进行预构建
    }
}
```

决定是否重新运行预构建：packages.json中的dependencies列表、包管理器的lockfile、可能在vite.config.js相关字段中配置过的，只要一个变化就会重新预构建

### 开发服务器

koa：node 端的一个框架，是 vite 开发服务器

不能使用 esm，必须 commonjs

```js
// yarn add koa
const Koa = require("koa")
const app = new Koa();
// 当请求来临时，会进入这个回调函数中
// ctx 是上下文，可以得到请求信息，响应信息
app.use((ctx) => {
    // 判断不同的路径，返回不同的文件
    // / 返回 index.html
    // js 读取内容将非相对路径的改为特定路径然后发挥，比如如果是在 node_modules 下的就改为 /@modules/vue 这样的格式
    // /@modules 将路径替换为在 node_modules 下去查找对应文件返回
    // .vue  ast 语法分析
    //      没有type：js 部分使用js 方法替换，然后拼接上 template 和 css 的部分返回 js【继续请求该文件拼上后缀 type=template 、type=style】
    //      type 为 template，使用 template 相关处理后返回相应的 js
    //      type 为 css：以 js 格式返回，将 css 放 head 的 style 标签中去
    
})
app.listen(8899, () = {
    console.log("vite 启动了，端口 8899");
})
```



## 生产环境

使用 rollup 打包

## 静态资源

除了动态 api 之外，百分之九十九都被操作为静态资源

- json

  ```js
  如果不是 vite，而是其他构建工具， json 的导入导出会作为一个 JSON 字符串形式存在
  如果 import { key1, key2 } from "xxx.json" 打包时 vite 会摇树删掉多余属性值
  ```

- 图片

  ```js
  import imgUrl from "xxx..png" // 得到图片地址,相当于默认加了?url  imgDom.src = imgUrl
  import imgBuffer from "xxx.png?raw" // 得到 buffer 乱码
  ```

  svg 可伸缩矢量图形-不会失真、尺寸小，无法很好表示层次丰富的图片信息

  - 可当做普通图片使用

  - 可 css 修改 svg 颜色
    ```js
    import svgRaw from "xxx.svg?raw"
    body.innerHTML = svgRaw
    svgDom = documen.getElementsBtTagName["svg"][0]
    svgDom.onmouseenter = function() {
        this.style.fill = "red"
    }
    ```

    

# vite 使用

> node 环境使用的是 commonjs 规范，vite.config.js 是 node 环境中执行的，为什么 vite.config.js 中可以书写成 esm 的形式呢？
>
> 因为 vite 在读取 vite.config.js 时换先 node 去解析文件语法，如果发现是 esm 会直接将 esm 进行替换成 commonjs 规范

## 语法提示

vite.config.js  导出一个 js 对象作为配置

```js
export default {
	...
}
```



从 vite 引入 defineConfig 函数，是为了方便语法提示

```js
import { defineConfig } from "vite";
export default defineConfig({
    ...
})
```

或者写上注释

```
/** @type import("vite").UserConfig */
const viteConfig ={...}
export viteConfig;
```

## 判断不同环境

```js
import { defineConfig } from "vite";
export default defineConfig(({mode, command}) => {
    ...
    return {...}
})
```

## 环境变量

代码环境：开发环境、测试环境、预发布环境、生产环境

不同环境有些信息是不一致的，比如后端接口地址等

`dotenv`库：自动读取 .env 库并解析这个文件中的对应环境变量，并将其注入到 process【node 环境】 中去，但是 vite 考虑到和其他配置的冲突问题，不会直接注入到 process 对象下

1. 服务端，可以从 vite 中引入 loadEnv 方法取到配置

```js
// 第一个参数 mode：是什么环境/模式
// 第二个参数 配置文件的目录
// 第三个参数 配置文件的前缀 默认是 .env
const env = loadEnv(mode, process.cwd(), ".env")
```

.env 是公用配置

.env.development 开发环境配置

.env.production 生成环境配置

执行 dev 时，vite 会自动设置为开发模式即 `yarn dev --mode development`

模式下的配置将会覆盖公用配置

2. 客户端，环境变量将会注入到 import.meta.env

vite 做了拦截，如果变量不是 VITE_开头的，这个变量不会注入到 import.meta.env 中去

这个前缀 VITE_ 可以在 vite.config.js 中进行修改

```
{
	envPrefix: "ENV_"
}
```

## css

### modules： 对 css 模块化默认行为进行覆盖

https://cn.vitejs.dev/config/shared-options.html#css-modules

这个的配置最后会给 postcss modules 进行处理

以 .module.css 为后缀名的 CSS 文件都被认为是一个 CSS modules 文件

```js
{
    css: {
        modules: {
            localsConvention: "camelCase"
            ...
        }
    }
}
```

- localsConvention 修改生成的 key 的命名是驼峰还是中划线
  - camelCase | camelCaseOnly |dashes | dashesOnly | null
- scopeBehaviour：配置当前的模块化行为是模块化还是全局化
  - local：默认，类名有 hash
  - global：全局化就会将样式进行全局定义，没有 hash 类名了
- generateScopedName：生成类名的规则
  - 字符串：`[name]_[local]_[hash:5]`
  - 函数：（name, filename, css） => `${name}_${Math.random().toString(36).substr(3, 8)}`

- hashPrefix：生成hash时根据类名+一些其他（文件名，内部随机生成的字符串）生成
  - 字符串：如 "hello"
- globalModulePaths：不想参与到 css 模块化的路径
  - 字符串数组

### preprocessorOptions：css 预处理器全局参数



```js
{
    css: {
        preprocessorOptions: {
            less:{ 
                // 整个配置对象会最终用给到 less 的执行参数（全局参数）中去
                // 具体配置见 https://less.bootcss.com/usage/#lessjs-options
                math: "always", // 数学计算
                globalVars:{ // 全局变量
                    mainColor: "red"
                }
            }
        }
    }
}
```

### devSourceMap 文件索引

编译压缩后，调试方便找到源文件

```js
{
    css: {
        devSourceMap: true // 默认是 false
    }
}
```

### postcss

1. 对未来 css 属性的一些使用降级处理【新旧浏览器的兼容】【babel 是对 js 降级处理】
2. 前缀补全【不同浏览器的兼容】

```yarn add postcss-cli postcss -D```

```yarn add postcss-preset-env -D```

postcss-preset-env 预设：可以将必要的插件一次性给安装上

在 vite.config.js 中

```js
{
    css:{
        postcss: {
            plugin: [postcssPresetEnv()]
        }
    }
}
```

在 postcss.config.js

```js
const postcssPresetEnv = require("postcss-preset-env");
const path = require("path");
module.exports = {
    plugins: [
        postcssPresetEnv({
            // 
            // css 原生变量，这个变量文件最好就是 css，避免多余解析
            // 全局导入
        	importFrom: path.resolve(__dirnamem, "./variable.css")
            // 该属于未来会被移除，可以将这个 css 变量文件全局首先引入
        })
    ]
}
```



## 别名配置

```js
{
     resolve: {
       alias: {
         "~": path.resolve(__dirname, "./"),
         "@": path.resolve(__dirname, "./src")
       }
    }
}
```

原理：vite 的服务器在给浏览器发送文件内容前，会遍历文件内容，将别名转为配置中的绝对路径

## 静态资源在生产环境

打包后的静态资源为什么有 hash？

- 浏览器的缓存机制，文件名字相同的，会先从缓存读取

- 文件内容一点没变，hash 是一致的，变了 hash 就会变
  ```js
  {
      build: {
          rollupOptions: {
              output: {
                  assetsFileNames: "[hash].[name].[ext]"
              }
          },
          outDir: "testDir", // 打包后目录，默认叫 dist
          assetsDirs: "static", // 打包后静态资源目录，默认叫 assets
          emptyOutDir: true, // 清除输出目录中的所有文件，默认是 true
          assetsInlnlineLimit: 4000 // 低于 4 kb 的图片将会被转为 base64 的图片
      },
          
  }
  ```



# vite 插件

[vite 官方插件](https://cn.vitejs.dev/plugins/)

[vite 社区插件](https://github.com/vitejs/awesome-vite#plugins)

[插件 API](https://cn.vitejs.dev/guide/api-plugin.html)

vite 的生命周期不同阶段中调用不同的插件达到不同的目的

- 插件一般都是一个函数，方便扩展
- 必须返回一个配置对象，这个对象是 viteConfig 中你想改的那部分
- 最后的配置，是 vite.config.js 的配置与插件中返回的配置结合生成的

## vite-aliases

自动生成别名，监测 src 下所有一级文件夹并生成别名，如 src/assets => @assets

yarn add vite-aliases -D

```
import viteAliases from "vite-aliases";
{
	plugins: [
		viteAliases()
	]
}
```

手写原理：

```js
const fs = require("fs");
const path = require("path");

function diffDirAndFile(dirFilesArr = [], base = "") {
    const re = {
        dirs: [],
        files: []
    };
    dirFilesArr.forEach(name => {
        const currentFileStat = fs.statSync(path.resolve(__dirname, basePath + "/" + name))
        const isDir = currentFileStat.isDirectory();
        if (isDir) {
            re.dirs.push(name);
        } else {
            re.files.push(name);
        }
    })
    return re;
}

function getAllDirs() {
    const result = fs.readdirSync(path.reslove(__dirname), "../src")
    const diffRe = diffDirAndFile(result, "../src");
    const resolveAliasesRe = {};
    diffRe.dirs.forEach(dirname => {
        const key = "@" + dirname;
        resolveAliasesRe["@" + dirname] = path.resolve(__dirname, "../src" + "/" + dirname)
    });
    return resolveAliasesRe;
}
module.exports = () => {
    return {
        config(config, env) {
            return {
                resolve: {
                    alias: getAllDirs()
                }
            };
        }
    }
}
```

## vite-plugin-html

```js
module.exports = (options) => {
    transformIndexHtml: {
        enforce: "pre", // 将这个插件放前面执行，避免别的插件执行时看不懂语法报错
        tansform: (html) => {
            return html.replace(/<%= title %>/g, options.inject.data.title)
        }
    }
}
```

## vite-plugin-mock

vite server 的相关钩子

```js
const fs = require("fs");
module.exports = (options) => {
    return {
        configureServer(server) {
            const mockStat = fs.statSync("mock")
            let mockResult = [];
            if (mockStat.isDirectory()) {
                mockResult = require(path.resolve(process.cwd(), "mock/index.js"));
            }
            // req 用户的请求
            // res 响应对象
            // next 处理结果交给下一个中间件执行
            server.middlewares.use((req, res, next) => {
                const findItem = mockResult.find(v => v.url === req.url);
                if (findItem) {
                   res.setHeader("Content-type", "application/json");
                   res.end(JSON.stringify(findItem.response(req)));
                } else {
                    next();
                }
            })
        }
    }
}
```

## transform(code, id)

将代码进行转换后返回，id 是代码所在文件位置

# 性能优化

- 开发时的构建速度：yarn dev 开始执行到呈现结果的时长（vite 是按需加载）

- 页面性能指标

  - 首屏渲染时长：fcp（first content paint）
    - 懒加载：写代码实现
    - http 优化：协商缓存和强缓存
      - 强缓存：服务端给响应头追加一个字段（expires），客户端记住这些字段，在截止时间前，无论怎么刷新页面，浏览器都不会重新请求而是从缓存中取
      - 协商缓存：是否需要缓存要跟后端商量一下，即当服务端打上协商缓存的标记以后，客户端在下次刷新页面需要重新请求资源时会发送一个协商请求给服务器，如果需要变化，则服务器会相应具体内容，否则响应304

  - 页面中最大元素的时长：lcp（largest content paint）

- js 逻辑：

  - 副作用的清除：如计时器

- css

  - 关注继承属性，能继承的就别自己写

  - 尽量避免太过深的 css 嵌套

- 构建优化：优化体积如压缩、摇树、图片资源压缩、cdn 加载、分包

## 分包策略

把一些不会常规更新的文件，进行单独打包处理

浏览器缓存策略：静态资源如果名字没有变化，就不会重新去拿；执行分包后，这些文件就长期缓存了

```js
{
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    // 将来自 node_modules 的打包成一个单独的 js 文件
                    if(id.includes("node_modules")) {
                        return "fixjs";
                    }
                }
            }
        }
    }
}
```

## gzip 压缩

将所有静态文件进行压缩，达到减少体积的目的（服务器 =》压缩，客户端=》解压缩）

chunk 块：从入口文件到一些列依赖最终打包成的 js 文件叫做块

- yarn add plugin-compression -D
- 在vite.config.js 中使用这个插件

- 打包时，会有 .gz 后缀的文件，运维在部署时，需要设置一个响应头 content-encoding：gzip（告诉浏览器这个是gzip 压缩过的，需要解压）
- 浏览器需要承担解压时间，所以文件不是很大的话不要进行压缩

## 动态导入-代码分割

动态导入是 es6 的新特性

```js
import "./xxx.js"; => import("./xxx.js").then(xxxx)
```

该功能常用于 vue 路由中，根据不同的地址，展现不同的组件，对这些组件进行独立打包

使用动态导入前

```js
import Home from "./Home.vue";
import About from "./About.vue";

const routes = [
    {
        url: "/home",
        component: Home
    },
    {
        url: "/about",
        component: About
    }
]
```

使用动态导入后

```js
const routes = [
    {
        url: "/home",
        component: import("./Home.vue")
    },
    {
        url: "/about",
        component: import("./About.vue")
    }
]
```

## cdn 加速

cdn - 内容分发 - content delivery network：将依赖的第三方模块全部写成 cdn 的形式，保证自己的代码的一个小体积 - 体积小服务器和客户端的传输压力就没那么大

否则打包的代码都在一个地方的服务器上，远的地方访问就会比较慢，自己本身的代码体积也较大

以 lodash 为例

- yarn add vite-plugin-cdn-import -D

- vite.config.js 中使用这个插件，并传入相关配置
  ```js
  {
      plugins: [
          vitePluginCdnPlugin({
              modules: [{
                  name: "ldoash", // 依赖名称
                  var: "_", // 别名
                  path: "https://xxxcdn.min.js" // cdn 地址
              }]
          })
      ]
  }
  ```

原理：

- 判断是生产环境，就插入 script 标签，地址为配置的地址
- 利用了 build - rollupOptions
  - external: ["lodash"]

# globEager 和 glob

https://juejin.cn/post/7218032919008624700

```js
// 匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk
const modules = import.meta.glob('./dir/*.js')
/*
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js'),
}
*/

// 同步加载
const modules = import.meta.glob('./dir/*.js', { eager: true }); // 与import.meta.globEager()一致
/*
import * as __glob__0_0 from './dir/foo.js'
import * as __glob__0_1 from './dir/bar.js'
const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1,
}
*/
```





# 相关知识点

[浏览器缓存](/other/浏览器缓存)

[ESM]()

[跨域](/other/跨域)

