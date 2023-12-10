# 简介

[npm](https://www.npmjs.com/package/commander)

node.js 命令行工具

[参考](https://cloud.tencent.com/developer/article/1887034)

## 使用

```js
const program = require("commander");
 
program
    .version('0.0.1')
    .parse(process.argv);
```

下面代码在开头 `const program = require('commander');` 结尾 `program.parse(process.argv);` 基础上进行说明

假设执行 my-cli 时去执行这些逻辑

### version 显示版本 

`program.version("x.y.z")`

```js
program.version('0.0.1'); // my-cli -V
// 自定义缩写，与 option 方法相同的语法传入参数
program.version('0.0.1', "-v, --version"); // my-cli -v 或 my-cli --version
```

这时候 my-cli help 打印如下

```js
Usage: my-cli [options]

Options:
  -v, --version  output the version number
  -h, --help     display help for command
```

### command、action 自定义命令执行逻辑 

`program.command("command <arg> [args...]").action(() => {})`

action：命令回调函数

```js
// my-cli list
program.command('list')
    .action(() => {
    	console.log("command:list")
    	require("./list.js"); // 引入某个文件逻辑执行
	})
// 必传参数
// my-cli list amy
program
    .command('list <name>')
    .action((name) => {
    	console.log(name) // amy
	})
// 多个必传参数
// my-cli list amy amy1
program
    .command('list <name> <name1>')
    .action((name, name1) => {
    	console.log(name, name1) // amy, amy1
	})
// 可选参数
// my-cli list amy
program
    .command('list [name]')
    .action((name) => {
    	console.log(name) // amy
	})
// 多个选参数
// my-cli list amy a b c d
program
    .command('list [name...]')
    .action((name) => {
    	console.log(name) // ["amy", "b", "c", "d"]
	})
```

### alias 命令别名

`program.alias("alias")`

```js
// 执行 my-cli list 与 my-cli l 效果一样
program
  .command("list")
  .alias("l")
  .action(() => {
    console.log("command:list")
  })
```

### usage、description 命令用法与描述

```js
program
    .command("list [name...]")
    .alias("l")
    .usage("[多个名称]")
    .description("我是描述");
```

执行 my-cli list help 或者 my-cli list -h，打印如下

```js
Usage: my-cli list|l [多个名称]

我是描述

Options:
  -h, --help  display help for command
```

### option 命令选项

```program.option("简写, 全称"，描述,  默认值)```

简称：-后面接单字符

全称：--后面接多字符

简称和全称可以使用逗号（,）、空格、竖线（|）分隔

```js
// my-cli list
program
    .command("list")
    .option("-y, --yes", "全部执行", true)
    .option("-n, --no", "全部不执行")
    .action((a) => {
      console.log(a) // {yes: true}
    })
// my-cli list a b -n
program
    .command("list [names]")
    .option("-y, --yes", "全部执行", true)
    .option("-n, --no", "全部不执行")
    .action((a) => {
      console.log(a) // ["a", "b"], {yes: true, no: true}
    })

// my-cli list -h
Usage: byvue-m list [options]

Options:
  -y, --yes   全部执行 (default: true)
  -n, --no    全部不执行
  -h, --help  display help for command
```



