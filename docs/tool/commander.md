commander：https://juejin.cn/post/6959750919491682318

```js
const program = require('commander')

program
  .command('init <模板名称> [项目名称]')
  .option('-i, --install', '模板下载完成后自动下载依赖')
  .description('初始化一个项目')
  .action((_, __, cmd) => {
    console.log("abc", cmd.install )
})
```

