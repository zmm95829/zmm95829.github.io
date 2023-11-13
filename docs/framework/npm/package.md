# package.json

是每个工程化前端项目都有的 json 文件，位于项目根目录

[package.json 配置完全解读](https://juejin.cn/post/7145759868010364959)

## 属性详解

1. "name"："myName"

   - 项目名称，如果是作为第三方库，是安装的依赖名称，如 yarn add myName

2. <span id="version">"version"</span> : "Major.Minor.Patch"

   - name + version 能共同构成一个完全唯一的项目标识符，安装依赖时可以固定某个版本号进行安装

   - 主版本号 Major：不兼容更新时升版

   - 次版本号 Minor：增加向下兼容的新特性时升版

   - 修订号 Patch：向下兼容的修复问题时升版

   - 可以执行这些命令自动升级并commit，主要需要发布之前执行，并且本地不能有变更文件
     ```js
     npm version major
     npm version minor
     npm version patch
     ```

   - Major.Minor.Patch 为标准版本号，是正式发布的版本；开发过程中还有内测、 公测、 生产候选等种版本形式 （先行版本号）

     - 先行版本号=标准版本号 + "-" + 字符串，字符串：大小写字母、数字、句点组成
     - 如 1.2.3-1，1.2.3-alpha.1，是合法的，但一般按照约定命名
       - 1.2.3-alpha.1：1.2.3 内测的第一个版本
       - 1.2.3-beta.1：1.2.3 灰度测试的第一个版本
       - 1.2.3-rc.1：1.2.3 生产候选的第一个版本
       - 先后顺序：1.2.3-alpha.1 < 1.2.3-beta.1 < 1.2.3-rc.1
     - 带有现行版本号标准的版本号，是小于对应标准号的，如 1.2.3-alpha.1 是小于 1.2.3 的，因为是内测版本

   - 版本匹配

       |                      | x.y.z                                                        |
       | -------------------- | ------------------------------------------------------------ |
       | 星号（*）、x         | 安装最新大版本的依赖包<br />yarn add lodash@*<br />yarn add lodash@x |
       | 插入符号（^）        | 除了左侧第一个非0位，其他都能改<br />^1.2.3：>= 1.2.3 < 2.0.0<br />^0.2.4：>0.2.4 < 0.3.0<br />^1.0.0、1、1.x：主版本是 1 的最新版本<br />npm安装时候的默认符号为插入符合：yarn add lodash，安装后在依赖列表中版本是 ^4.17.21 |
       | 波浪符号（~）        | 允许修改最后一位被指定的版本号（只能修改z）<br />会更新到当前 minor version（也就是中间的那位数字）中最新的版本<br />~1.1.0、1.1、1.1.x：主版本是 1 且次版本是 1 的最新版本 |
       | 不带标志             | 锁定版本号<br />1.2.3                                        |
       | 别名标签（dist-tag） | 比如 yarn add lodash@latest 会安装最新版，这个 latest 就是 dist-tag<br />在开发插件时，可以使用 npm dist-tag lodash@2.3.4 latest 这样的命令将某个版本打上标志 |
       | >= x.y.z             | 版本信息大于等于给定值                                       |
       
   - [node-semver](https://github.com/npm/node-semver) 库，npm 所有关于版本号的操作，都可以实现

       - 校验一个版本号是否合法
       - 比较两个版本号之间的大小
       - 校验一个版本号是否匹配了某个版本匹配规则...

3. repository：仓库地址相关信息对象
   ```js
   {
     "type": "git",
     "url": "https://github.com/facebook/react.git",
     "directory": "packages/react"
   }
   ```

4. "description": "项目描述，会在 npm 官网展示"

5. "keywords": ["项目关键词", "在 npm 可以根据关键词搜索到库"]

6. "homepage": "项目主页地址，通常是 github 链接或者项目官网、文档首页"

7. "bugs": "bug 反馈地址，通常是 github issue 页面的链接如  https://github.com/vuejs/core/issues"

8. "license": "开源许可证 如 [MIT](https://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html)"

9. "author": "作者"

10. "files": ["发布时指定文件", 可以模糊匹配如 "mine/*.{js, json}"]

    - 发布时默认会包括 package.json，license，README 和main 字段里指定的文件
    - 忽略 node_modules，lockfile 等文件

11. "type": "module | commonjs"

    - 配置为 module 后，.js 文件会用 esmodule 解析，否则 .mjs 的才 es 解析
    - 配置为 module 后，如果是 commonjs 规范，则文件需要 .cjs -- 不要混用，否则容易报错

12. "main": "作为第三方库时的入口文件路径"

    - 默认为根目录下 index.js，可以自己指定如 ./dist/index.js
    - 在 browser 和 Node 环境中都可以使用

13. "browser": "在 web 端使用时，作为第三方库时的入口文件路径"

    - 与 main 不同的是，配置 browser 只针对 web 端有效，server 无效

14. "module": "作为第三方库时 ES 模块的入口文件路径"

    - main、browser、module 同时存在时，像 webpack，rollup 等构建工具会感知这些字段，并会根据环境以及不同的模块规范来进行不同的入口文件查找
    - 如 webpack 构建为 web 时，resolve.mainFeilds 字段默认为 ['browser', 'module', 'main']，即顺序为 browser > module > main 查找入口文件

15. "exports": {}

    - node v14.13 开始支持

    - 除了 exports 定义的路径外，不能访问别的

    - ```json
      "exports": {
        // commonjs 规范引入的入口
        "require": "./index.js",
        // es 规范引入的入口
        "import": "./index.mjs"
       }
      // 等同于
      "exports": {
        ".": {
          "require": "./index.js",
          "import": "./index.mjs"
        }
       }
      // 指定样式文件入口
      "exports": {
        ".style": "./dist/css/index.css"
       }
      ```

16. "workspaces": ["工作区配置"]

    - 工作区用于管理一个项目下多个包，每个包有自己的 package.json
    - workspaces 一般配置为 ["packages/*"]，也就是子包都放 packages 目录下
    - npm install 时会自动将子包下的依赖一起安装到根目录下，不同包的相同依赖会进行合并只下载一次

17. "scripts": {} 脚本配置

    - 使用 `npm run 命令`或者 `yarn 命令` 可执行对应操作

    - 前后置命令：pre 和 post【pnpm 和 yarn2 已废弃】
      ```json
      "scripts": {
          "build": "vite build",
          "prebuild": "xx",
          "postbuild": "xx",
      } 
      ```

      执行 yarn build 时，会按照顺序：prebuild > build > postbuild 这样执行

18. "config": {} 脚本运行时参数配置

    ```js
    "config": {
        "port": "8989" // 可以使用 process.env.npm_package_config_port 获取到
    }
    ```

19. "dependencies": {} 运行依赖\生产依赖

    - npm install xxx 或者 npm install xxx --save 安装依赖时会将依赖信息放入该字段中
    - 版本号规则可[参考 version](#version)

20. "devDependencies": {} 开发依赖

    - npm install xxx -D 或者 npm install xxx --save-dev 安装依赖时会将依赖信息放入该字段中

21. "peerDependencies": {} 同伴依赖

    - 组件库中，与项目用到了相同的依赖，这个依赖在组件库中可以被放 peerDependencies 节点下，当组件被应用到主项目中去后，依赖将会以项目中的依赖版本为主，可以避免类似的核心依赖库被重复下载的问题

    - 通常用于表示与另一个包的依赖与兼容性关系来警示使用者，常在开发第三方库（插件）中见到，**不会被自动安装**

      - 当同伴依赖包名相同但版本不同时，安装依赖会有警告提示，这时候如果命令后面添加 `--legacy-peer-deps` ，可以绕过子项目依赖的包版本相互不兼容的问题 [参考](https://juejin.cn/post/7206264862657577019)

    - peerDependencies 中的依赖表示当前库是依托于这些依赖存在的，项目中使用当前插件时，必须先有这些依赖

      ```js
      "peerDependencies ": {
          "vue": ">=2.6"
      }
      ```

    - 项目中使用规则：

      - 项目中如果显式依赖了这些库，则可以忽略各插件的 peerDependency 声明
      - 项目中如果没有显式依赖这些库，则按照当前插件的 peerDependencies 中声明的版本将依赖安装到项目根目录中
      - 如果项目中依赖的版本、各插件依赖的版本之间不相互兼容，会报错让用户自行修复

22. "optionalDependencies": {} 可选依赖

    - npm install xxx -O 或者 npm install xxx --save-optional 安装依赖时会将依赖信息放入该字段中
    - 该依赖对于插件来说不是必需的，只是一个锦绣添花的作用，就算安装失败也不影响核心功能
    - 代码中引入可选依赖的地方需要做空判断

23. "peerDependenciesMeta": {} 将同伴依赖指定为可选的

    ```js
    {
        "peerDependencies ": {
            "colors": "^1.5.0"
        },
        "peerDependenciesMeta ": {
            "colors": {
                "optional": true
            }
        },
    }
    
    ```

24. "bundleDependencies": ["vue", "lodash"] 打包依赖

    - 执行 npm pack 打包生成 tgz 压缩包中，将出现 node_modules 其包含 vue 和 lodash
    - 项目中使用这个库，安装相关依赖时，会将 vue 和 lodash 依赖放当前库目录下的 node_modules 下去
    - 值必须是在 dependencies 或者 devDependencies 中声明过

25. "overrides": {} 重写依赖的依赖版本号 [参考](https://developer.aliyun.com/article/1050105)

    - ```js
      "overrides": {
          // ===全局替换===
          // webpack 的版本全部重写到 5
          "webpack": "5",
          // react 替换成 dependencies 中声明的版本
          "react": "$react",
          // 6.0.0 的 babel 版本重写到 6.0.1
          "babel@6.0.0": "6.0.1", 
          // 满足 ms@^2 的包重写版本声明到 ^1
          "ms@^2": "^1",
          // 把 tnpm 这个包全局替换成一个空包，相当于删除这个依赖
          "tnpm": "npm:noop-package@1.0.0", 
          // 把所有 underscore 替换成 lodash
          "underscore": "npm:lodash", 
          // 把 metameta 替换成一个自己的 fork
          "metameta": "github:some-group/metameta-fork",
              
           
          // ===嵌套重写===
          "ice.js": {
              // ice.js 版本重写为 1.2.0
              ".": "1.2.0",
              // ice.js 下所有的 webpack 依赖版本重写到 5
              "webpack": "4" // webpack 匹配了多个规则，嵌套越深的优先级越高
          }
           
      }
      ```

    - overrides 与在 package.json 中直接声明的依赖版本规则不能出现冲突

    - yarn 中需要使用 resolutions 字段

      - yarn 仅支持匹配包名，不支持在选择器中使用版本范围来选择特定包的特定版本
        ```js
        "resolutions": {
            // 重写所有 typescript 版本到 2.3.2
            "**/typescript": "2.3.2",
            // 上面语法的语法糖
            "typescript": "2.3.2",
            // 重写除一级依赖之外，所有的 typescript 版本到 ^3
            "typescript": "^3",
            // 重写版本声明同样支持如 npm:noop-package@1.0.0，github 仓库等语法。
              
            // === 嵌套重写 ===
            // 仅重写 @angular/cli 直接依赖的 typescript 版本
            "@angular/cli/typescript": "2.3.2",
            // 重写 @angular/cli 下所有依赖的 typescript
            "@angular/cli/**/typescript": "2.3.2",
        }
        ```

      - 【yarn 1】dependencies 声明的优先级高于 resolutions（resolutions  可以与直接声明的依赖版本规则冲突）：如 dependencies 中的依赖与 resolutions 中声明的规则冲突时，当前项目的直接依赖按照 dependencies 规则安装，依赖的依赖按照 resolutions 中的规则安装（有可能放在依赖的 node_modules 下而不是根目录的 node_modules 下了）

      - 【yarn 3】resolutions声明的优先级高于 dependencies 

26. "private": true 私有项目不会发布到公共 npm 仓库上

27. "publishConfig": {} 发布时相关配置
    ```js
    "publishConfig": {
      // 安装依赖时指定了 registry 为 taobao 镜像源，但发布时希望在公网发布，就可以指定 publishConfig.registry
      "registry": "https://registry.npmjs.org/"
    }
    ```

28. "engines": {} node 或者包管理器版本要求
    ```js
    "engines": {
      "node": ">= 14 <16",
      "pnpm": ">7"
    }
    ```

29. "os": ["darwin", "linux"] linux 正常但windows 可能异常的兼容

30. "cpu": ["x64", "ia32"] 只能在特定的 CPU 体系上运行

31. "types": "指定 ts 类型定义的入口路径如 ./index.d.ts"

32. "unpkg": "开启 cnd 服务指定的入口地址如 dist/index.js"，当访问 https://unpkg.com/xxx 时就重定向到最新版本入口文件

33. "jsdelivr": "开启 jsdelivr 指定的入口地址" （https://cdn.jsdelivr.net/npm/xxx）

34. "browserslist": ["\> 1%", "last 2 versions"

    - 处理浏览器兼容
    - babel 和 autoprefixer 等工具会使用该配置对代码进行转换
    - 可  .browserslistrc 单文件配置

35. "sideEffects": ["dist/xx", "*.css"]

    - 设置某些模块具有副作用，tree-shaking 时不会因为引入但没有使用而删除

36. "lint-staged": {}  对 git 的暂存区的文件进行操作

    ```js
    "lint-staged": {
      "src/**/*.{js,jsx,ts,tsx}": [
        "eslint --fix"
      ]
    }
    // 可以排除掉某个文件夹
    "lint-staged": {
      "src/!(public)/**/*.{js,jsx,ts,tsx}": []
    }
    ```

    - 通常配合 husky 这样的 git-hooks 工具一起使用

37. "bin" 内部命令入口文件

    ```js
    "name": "my-cli"
    // 可以是字符串
    "bin": "dist/index.js"
    // 可以是对象
    "bin": {
      "my-cli": "bin/index.js",
      "my-clia": "bin/index1.js",
    }
    ```

    - 当安装 my-cli 这个依赖后，可以通过执行命令 my-cli 去运行 node_modules/my-cli/dist/index.js 文件，执行命令 my-clia去运行 node_modules/my-cli/dist/index1.js 文件

    - 这种命令方式执行的 js 文件，顶部需要特定格式，如下
      ```js
      #!/usr/bin/env node
      ```

## 命令的并行、顺序执行

### 多个命令

- &&：顺序执行多条命令，当碰到执行出错的命令后将不执行后面的命令
- &：并行执行
- ||：顺序执行多条命令，当碰到执行正确的命令后将不执行后面的命令
- |：管道符

### scripts 中运行兄弟命令

npm-run-all：跨平台，一种可以并行或顺序运行多个 npm 脚本的 CLI 工具，综合性命令（可顺序可并行）

yarn add npm-run-all -D

run-s 简写，等价于 npm-run-all -s 顺序（sequentially）运行 npm-scripts
run-p 简写，等价于 npm-run-all -p 并行（parallel）运行 npm-scripts

```js
"script": {
  "n_1": "node ./1.js",
  "n_2": "node ./2.js",
  "n_3": "node ./3.js",
  "test": "npm-run-all -p n_1 n_2 -s n_3" // 并行执行n_1、n_2；然后执行n_3
}
```



# 问题

## vite 打包报错 Last few GCs

- setx NODE_OPTIONS --max_old_space_size=4096 没用，只在当前窗口 cmd 使用也没用

- 删除 node_modules 重新安装依赖，也没用

- 有的说切换node到12.14.1 -- 没试过

- 单纯安装 increase-memory-limit好像

- 最后解决了：

  ```js
  1.yarn add increase-memory-limit cross-env --dev
  2.在package.json的script中添加："fix-memory-limit":"cross-env LIMIT=8192 increase-memory-limit" 
  3.先运行 yarn fix-memory-limit
  4.再打包 yarn build
  ```

  "cross-env": "^7.0.3"

  "increase-memory-limit": "^1.0.7",

- 这个好像也可以 --不知道是不是上一个影响的

  ```js
  安装插件：npm install -g increase-memory-limit
  执行命名：npx cross-env LIMIT=4096 increase-memory-limit
  ```

