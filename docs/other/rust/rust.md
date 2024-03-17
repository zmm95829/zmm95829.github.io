https://kaisery.github.io/trpl-zh-cn/ch01-01-installation.html

# 应用

开源项目，基于 rust 的 [pake](https://gitee.com/mirrors/Pake)， 打包网页成应用，比 Electron 套壳打包，要小将近 20 倍，5M 上下

基于 rust + web 的 [tauri](https://tauri.app/zh-cn/)， 制作桌面应用程序

[tauri实战项目](https://www.bilibili.com/video/BV17W4y1j7KH/?spm_id_from=333.337.search-card.all.click&vd_source=561a6304caacdc5e5169405a79c5e26d) [github](https://github.com/feint123/feint-demos/tree/main)

|                | tauri                                                  | electron                     |
| -------------- | ------------------------------------------------------ | ---------------------------- |
| 浏览器引擎     | 系统自带的库<br />win：webview<br />mac、linux：webkit | 自己打包进去一个 chrome 引擎 |
| 生成的应用内存 | 较小                                                   | 较大                         |
|                |                                                        |                              |

[rust练习](https://github.com/sunface/rust-by-practice/blob/master/zh-CN/src/why-exercise.md)

[通过例子学 Rust 中文版](https://www.rustwiki.org.cn/zh-CN/rust-by-example/)

# 安装

[rustup](https://www.rust-lang.org/tools/install)：管理 Rust 版本和相关工具的命令行工具

检测是否安装成功：`rustc --version`



## hello_world.rs

```rs
// main 函数是一个特殊的函数，是最先运行的代码
fn main() {
    println!("Hello, world!"); // 函数名后有 ! 表示调用的宏而不是函数
}
```

在文件所在目录，执行：rustc hello_world.rs

在同级目录出现同名 .exe 和 .pdb，然后执行：.\hello_world.exe，可以看到打印了 Hello, world!

##  介绍

rust 是一种预编译静态类型（强类型）语言（可以编译好，将可执行文件发送给别人，这样他人就不需要安装环境了）

## 命名规范

- 项目名：下划线连接如 hello_world
- 文件名：rust 代码以 .rs 结尾，下划线连接如 hello_world.rs
- 常量：单词之间使用全大写加下划线，如果 HELLO_WORLD
- 变量名：下划线连接如 hello_world
- 函数名：下划线连接如 hello_world
- 结构体名：大驼峰如 HelloWorld
- 枚举名：大驼峰如 HelloWorld
- 枚举成员名：大驼峰如 HelloWorld

## 相关工具

### rustfmt

格式化工具，标准的 Rust 发行版中包含了这个工具

### Cargo

Rust 的构建系统和包管理器（处理很多任务，比如构建代码、下载依赖库并编译这些库）

rust 官方安装包自动安装了，执行 `cargo --version` 可只是否成功安装

Cargo.toml： Cargo 配置文件

src：源文件存放目录

|                           |                                                              |
| ------------------------- | ------------------------------------------------------------ |
| cargo new 目录名称        | 新建目录，目录名必须是组合单词，该目录下有 Cargo.toml，src/main.rs<br />--vcs=git：强制初始化 git 并生成 .gitignore |
| cargo new --lib 目录名称  | 新建库                                                       |
| cargo build               | 构建测试项目并生成可执行文件（target/debug 下）              |
| cargo build --release     | 构建发布的项目，会优化编译项目（target/release 下）          |
| .\target\debug\目录名.exe | 运行可执行文件                                               |
| cargo run                 | 编译并运行（源文件修改：编译并运行；未修改，之间运行之前编译好的）（target/debug 下） |
| cargo run -p 包名         | 工作区间运行某个包                                           |
| cargo check               | 检测当前代码是否可编译（检查错误）                           |
| cargo update              | 升级依赖版本，但仍然在版本规则内                             |
| cargo doc                 | 由 Rust 分发的工具 rustdoc 生成文档注释的 HTML 文档，并将生成的 HTML 文档放入 target/doc 目录 |
| cargo doc --open          | 构建所有本地依赖提供的文档，并在浏览器中打开                 |
| cargo test                | 运行测试，多个测试时默认是并行运行，并且会将打印默认截取只会输出是否测试通过的结果<br />cargo test -- --test-threads=1 将测试线程设置为 1<br />cargo test -- --show-output 测试成功的话，如果有打印，把打印也显示出来<br />cargo test fn_name 运行单个测试<br />cargo test name 运行含有[name]作为函数名的n个测试<br />cargo test -- --ignored 运行被忽略的测试<br />cargo test -- --include-ignored 无论是不是被忽略的测试都要运行 |
| cargo test -p 包名        | 工作区间下运行某个包的测试                                   |
| cargo test --help         | 提示 cargo test 的有关参数                                   |
| cargo test -- --help      | 提示在分隔符之后使用的有关参数                               |
| cargo publish             | 发布                                                         |
| cargo publish -p 包名     | 工作区间下发布某个包                                         |

#### Cargo.toml

```js
[profile.dev]
opt-level=0
[profile.release]
opt-level=3
```

cargo build 使用测试环境配置

cargo build --release 使用 正式环境的

- opt-level：对代码进行何种程度的优化，0 - 3，越高的优化级别需要更多的时间编译

# 语法

## 引入库

rust 已预导入的可以不引入了，否则需要使用 `use` 语句显式地将其引入作用域

```rs
use std::io;
io::stdin();
// 如果没有引入，可以使用函数调用 std::io::stdin()
```



### std::io::stdin

```rs
std::io::stdin()
	.read_line(&mut guess) // 变量 msg 接收用户输入内容，返回 Result 类型
	.expect("Failed to read line"); // Result 实例的 expect 方法，处理潜在的错误
```

### std::cmp::Ordering

Ordering 是一个枚举，成员是 Less、Greater 和 Equa

### rand::Rng

```
// 在 1- 100 之间生成一个随机数
rand::thread_rng().gen_range(1..=100);
```





## 常量

命名：单词之间使用全大写加下划线

```js
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
```



## 变量

### mut

变量默认是不可变的，变量名前使用 mut 来使一个变量可变

```rs
let num = 5; // 不可变
let mut num1 = 5; // 可变，但不能改变值的类型
```

### 隐藏

```js
let num1 = "x";
let num1 = 2; // 创建了一个新变量，之前的被隐藏了，num1 为 2
{
    let num1 = num1 + 9; // 新作用域内创建新变量，num1 为 11
}
// 保持之前作用域的 num1 为 2
```

## 数据类型

定义变量时，如果多种类型均有可能时需要添加类型注解，当只有一种可能时可以省略，代码可自行推断。

[标量类型](https://kaisery.github.io/trpl-zh-cn/ch03-02-data-types.html#%E6%95%B4%E5%9E%8B)（代表一个单独的值）：整型、浮点型、布尔类型和字符类型

复合类型：元组、数组

数字类型默认是: i32（有符号）(u开头的是无符号)

浮点型默认类型是: f64（所有的浮点型都是有符号的）

```js
let guess: u32 = "42".parse().expect("Not a number!");
let y: f32 = 3.0; // f32
let f: bool = false;
let z: char = 'ℤ';
```

复合类型：元组（单元元组：不带任何值的元组）、数组

元组长度固定：一旦声明，其长度不会增大或缩小

单元元组：不带任何值的元组。这种值以及对应的类型都写作 `()`，表示空值或空的返回类型。如果表达式不返回任何其他值，则会隐式返回单元值

数组：中的每个元素的类型必须相同

```js
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup; // 解构 let x = tup.0;

let a: [i32; 5] = [1, 2, 3, 4, 5]; // 确定数组元素的类型与个数
let a = [3; 5]; // 等价于let a = [3, 3, 3, 3, 3];
```

### vector

- 储存列表，只能储存相同类型的值；需要存储不同类型时借用枚举 - 确定类型，明确内存
- vector 是用泛型实现

```js
// 定义变量，vec 初始化
let mut v: Vec<i32> = Vec::new();
let mut v = vec![1, 2, 3];

// 添加元素
v.push(4);

// 读取元素
let third: &i32 = &v[2]; // 索引语法，得到引用；索引超范围会造成 panic
let third: Option<&i32> = v.get(2); // get 方法，得到 Option<&T>，索引超范围得到 None

// 遍历元素
for i in &v {
    println!("{i}");
}
// 遍历并修改 -- for 不能插入或删除
let mut v = vec![100, 32, 57];
for i in &mut v {
    *i += 2; // 使用解引用运算符（*）获取 i 中的值
    println!("{i}")
}

// 删除元素：移除并返回 vector 的最后一个元素，类型是 Option<T>
v.pop();
```

### String

as_bytes() 字符串转为字节数组

- String 和字符串 slices 都是 UTF-8 编码
- String 是一个 `Vec<u8>` 的封装

```js
// 定义空字符串
let mut s = String::new(); // 空字符串
// 定义有初始值的字符串
let s1 = "initial contents".to_string(); // 等同于 let s1 = String::from("initial contents");


// 添加字符串 String.push_str(&str)
let mut s1 = String::from("foo");
let s2 = "bar";
s1.push_str(s2); // 字面量字符串是 &str (引用)，所以这里没有获取所有权，下面还能使用 s2
println!("s2 is {s2}");

// 添加字符 String.push('char')
let mut s1 = String::from("foo");
s1.push('d'); // 只能传一个字符，需要使用单引号

// + 运算符拼接字符串：调用 add(self, s: &str) 函数
let s1 = String::from("Hello, ");
let s2 = String::from("world!"); // add 中 &String 可以被强转成 &str 使用
let s3 = s1 + &s2; // 注意 s1 被移动了，不能继续使用

// format! 宏拼接字符串，适用多个字符串情况下；参数使用的是引用，不会获取所有权
let s1 = "a";
let s2 = String::from("b");
let s3 = "c";

let s = format!("{s1}-{s2}-{s3}"); // a-b-c

// 截取字符串【不能以下标获取字符】
let hello = "Здравствуйте"; // 每个字母 2 个字节
let s = &hello[0..4]; // Зд

// 遍历字符
for c in "Зд".chars() {
    println!("{c}");
}
/*
З
д
*/

// 遍历字节
for b in "Зд".bytes() {
    println!("{b}");
}
/*
208
151
208
180
*/
```

#### 方法

|                    |                                  |
| ------------------ | -------------------------------- |
| split_whitespace() | 根据空格进行分割，可 for in 遍历 |
| as_str()           | 引用的字符串 slice               |
|                    |                                  |



### HashMap

- 又名：哈希、map、对象、哈希表或者关联数组
- 所有的键必须是相同类型，值也必须都是相同类型

```js
// 命名：没有被 prelude 自动引用
use std::collections::HashMap;
// 新建空 HashMap
let mut scores = HashMap::new();

// 添加元素
scores.insert("Blue", 10);
scores.insert("Yellow", 50);

// 获取元素：HashMap.get(&str)，得到 Option(&v)
let score = scores.get("Blue"); // .copied().unwrap_or(0) 将 Option<&i32> 转为 Option<i32>，无值时转为 0

// 遍历
for (key, value) in &scores {
    println!("{key}: {value}");
}

// 打印
println!("{:?}", scores);

// or_insert 方法在键对应的值存在时就返回这个值的可变引用，如果不存在则将参数作为新值插入并返回新值的可变引用
let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Blue"), 40); // 覆盖之前的值

scores.entry(String::from("Yellow")).or_insert(50); // 之前的不存在才插入
scores.entry(String::from("Blue")).or_insert(50);

println!("{:?}", scores); // {"Blue": 40, "Yellow": 50}
```



## 语句与表达式

语句：执行一些操作但不返回值的指令（let num1 = 4; 不能这样连续赋值 x = y = 6 因为 rust 的赋值语句不会返回值）

表达式：计算并产生一个值，表达式可以是语句的一部分（数字本身就是一个表达式）；表达式的结尾没有分号（在表达式的结尾加上分号，它就变成了语句，而语句不会返回值）

- 函数调用
- 宏调用
- 用大括号创建的一个新的块作用域

rust 是一门基于表达式的语言

## 函数

- 使用 fn 关键词定义函数

- 必须声明每个参数的类型
- 使用 return 关键字和指定值，大部分函数隐式的返回最后的表达式
- 在箭头（->）后声明函数的返回值类型

```js
fn fn_name(x: i32) -> i32 {
    i + 5
}

fn main() {
    let x = fn_name(8);
    println!("The value of x is: {x}");
}
```



### 关联函数/静态方法

String::new() ：调用函数创建一个空字符串
new 是类型 String 的关联函数，关联函数是是针对类型实现的，类似别的语言中的静态方法

```js
// 空字符串赋值给变量
let mut str1 = String::new();
```

## 注释

```js
// 简单注释
```

[文档注释](https://kaisery.github.io/trpl-zh-cn/ch14-02-publishing-to-crates-io.html#%E6%B3%A8%E9%87%8A%E5%8C%85%E5%90%AB%E9%A1%B9%E7%9A%84%E7%BB%93%E6%9E%84)

```
/// 文档注释
/// 在文档的内容之前
/// 三个斜杠
```

可以使用命令 cargo doc --open 将文档注释生产为 html，具体可参考发布 crate 内容





## 控制流

### if

```js
if num1 < 4 {
    
} else if num1 < 8 {
    
} else {
    
}
```

- 条件表达式返回值必须是 bool（rust 不会隐式转换）
- 如果有超过 1 个 else-if，则考虑使用 match
- if 是一个表达式，可以在 let 语句右侧使用（每个分支的可能的返回值都必须是相同类型）：let num2 = if bool1 { 5 } else { 7 };

### 循环 loop

```js
loop {
        println!("again!");
    }

// 循环标签
loop_label: loop {}
```

- ctrl-c 手动停止程序
- 代码中可以使用 break 关键字停止循环，break 后加表达式，则表达式值将会被停止的循环返回
- continue 关键字告诉程序跳过这个循环迭代中的任何剩余代码，并转到下一个迭代
- 使用循环标签可以在内层循环操作外层循环（break 或 continue 后加上标签名）

### 条件循环 while

条件为真时进入循环

```js
let mut number = 3;
while number != 0 {
        println!("{number}!");
        number -= 1;
}
```

### for in 

```js
for i in arr i {
  println!("{i}");
}
for i in (1..4) {
 println!("{i}");
}
```

### match 

match 是处理枚举的控制流结构

```js
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => {
         	println!("1"),
         	1
        },
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

- if 表达式必须返回一个布尔值，而这里它可以是任何类型的
- => 运算符将模式和将要运行的代码分开
  - 模式：使用枚举引用成员
  - 要运行的代码
    - 是一个表达式，该表达式的结果值将作为整个 match 表达式的返回值
    - 代码多行时，使用大括号包裹，且该分支后的逗号可省略
- 每个分支使用逗号分隔
- match 表达式必须是穷尽的，意为 match 表达式所有可能的值都必须被考虑到
- 一旦找到一个匹配的模式就会停止检查其它分支
- _：特殊模式，匹配任意值而不绑定到该值

### if let

- 可以认为 if let 是 match 的一个语法糖：值匹配某一模式时执行代码而忽略所有其他值
- 等号分隔模式和表达式：模式是 Some(max)，max 绑定为 Some 中的值
- 包含一个 else，else 与 _ 分支块中的代码相同
- Rust 并不要求一系列 if let、else if、else if let 分支的条件（条件可能互不相干）相互关联

```js
    let config_max = Some(3u8);
    if let Some(max) = config_max {
        println!("The maximum is configured to be {}", max);
    } else {
        ()
    }
// 等价于
    let config_max = Some(3u8);
    match config_max {
        Some(max) => println!("The maximum is configured to be {}", max),
        _ => (),
    }
}
```



# println!

```js
let num = 2;
println!("num = {num}, num + 5 = {}", num + 5); // num = 2, num + 5 = 7
```



# 所有权

rust 通过所有权系统管理内存，编译器在编译时会根据一系列的规则进行检查。如果违反了任何这些规则，程序都不能编译。在运行时，所有权系统的任何功能都不会减慢程序

栈以放入值的顺序存储值并以相反顺序取出值。这也被称作后进先出

栈中的所有数据都必须占用已知且固定的大小，在编译时大小未知或大小可能变化的数据，要改为存储在堆上

## 所有权规则

- Rust 中的每一个值都有一个所有者（owner）
- 值在任一时刻有且只有一个所有者
- 当所有者（变量）离开作用域，这个值将被丢弃【变量作用域】

## 变量与数据交互的方式

### 移动

存放在堆内存上的数据，变量 s1 赋值给另一个变量 s2 时，就是 s1 被移动（不叫浅拷贝）到了 s2 中，s1 不再有效，不能再被使用

```js
let s1 = String::from("hello");
let s2 = s1;
```

如果一个类型实现了 Copy trait（特殊注解），那么一个旧的变量在将其赋值给其他变量后仍然可用。类似整型这样的存储在栈上的类型，x 赋值给 y 后仍然可以使用

```js
let x = 5;
let y = x;
```

如下是一些 Copy 的类型：

- 整数类型
- 布尔类型
- 浮点数类型
- 字符类型
- 元组，当且仅当其包含的类型也都实现 Copy 的时候。比如，(i32, i32) 实现了 Copy，但 (i32, String) 就没有

### 克隆

```js
let s1 = String::from("hello");
let s2 = s1.clone();
```

### 引用

> 在任意给定时间，要么只能有一个可变引用，要么只能有多个不可变引用
>
> 引用必须总是有效的

引用可以使用一个值但不获取所有权

```js
// 未使用引用
fn main() {
    let s = String::from("hello");  // s 进入作用域

    test_fn(s); // s 的值移动到函数里 ...
                // s 不再有效
}
fn test_fn(str1: String) {
     println!("{}", str1);
}
// 1. 可以通过函数返回值来交还所有权
// 2. 通过 1 的方式可以使用元组方式既能得到所有权，还能得到其他值
// 3. 借用：创建一个引用来使用，如下

// 使用引用：以一个对象的引用作为参数而不是获取值的所有权
fn main() {
    let s = String::from("hello");

    test_fn(&s);
    println!("s is {}", s); // s 仍然有效
}
fn test_fn(str1: &String) {
     println!("{}", str1);
}

```

- 创建一个引用的行为称为借用

  - 借用不拥有所有权

  - 默认不允许修改引用的值

- 可变引用：在 & 后添加关键词 mut
  ```js
      let mut s = String::from("hello");
  // 可行
      let r1 = &mut s;
      println!("{}", r1);
      let r2 = &mut s;
      println!("{}", r2);
  // 不可行：不能同时对同一个变量创建多个可变引用
      let r1 = &mut s;
      let r2 = &mut s;
      println!("{}, {}", r1, r2);
  // 可行：一个引用的作用域从声明的地方开始一直持续到最后一次使用为止
  	let r1 = &s;
      let r2 = &s;
      println!("{} and {}", r1, r2);
      // 此位置之后 r1 和 r2 不再使用
      let r3 = &mut s;
      println!("{}", r3);
  // 不可行：不能在拥有不可变引用的同时拥有可变引用
      let r1 = &s;
      let r2 = &s;
      let r3 = &mut s;
      println!("{}, {} and {}", r1, r2, r3);
  ```

  

  - 不能同时对同一个变量创建多个可变引用
    - 编译时避免数据竞争，造成数据竞争的行为
      - 两个或更多指针同时访问同一数据
      - 至少有一个指针被用来写入数据
      - 没有同步数据访问的机制
  - 不能在拥有不可变引用的同时拥有可变引用
    - 作用域不能重叠

- 悬垂指针：指针还在但指向的内存已释放，Rust 中编译器确保引用永远也不会变成悬垂状态

### slice 引用

```js
let s = String::from("hello");
// 一个部分 String 的引用, 存储了 slice 的开始位置和长度
let slice = &s[0..2]; // he  开始位置 0 ，长度 2
let slice = &s[..2]; // 索引 0 可以省略

let slice = &s[3..s.len()]; // lo  开始位置 3 ，长度 s.len() - 3
let slice = &s[3..]; // 长度是剩余长度可以省略

// 以下也是等价
let slice = &s[0..s.len()]; // hello
let slice = &s[0..];
let slice = &s[..s.len()];
let slice = &s[..];
```

- 字符串 slice 的类型声明写作 &str：`fn fn_name(str1: &String) -> &str { &str1[0..3] }`
- &str 是一个不可变引用：字符串字面量是一个 &str 类型 （let s = "Hello, world!";）

- 不光字符串，数组也有 slice 引用

# 结构体

赋予更多意义

结构体并不是创建自定义类型的唯一方法

## 基础用法

```js
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}
// 整个实例必须是可变的, Rust 并不允许只将某个字段标记为可变
let mut user1 = User {
    active: true,
    username: String::from("some123"),
    email: String::from("somecom"),
    sign_in_count: 1,
}
user1.email = String::from("anothercom")
let user2 = User {
    email: String::from("user2com"),
    ..user1 // 必须放在最后，指定其余的字段应从 user1 的相应字段中获取其值
    // user1 的 username 字段中的 String 被移到 user2 中，user1 不能再使用
}
// 函数创建实例
fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username,
        email,
        sign_in_count: 1,
    }
}
```

## 元组结构体

没有具体的字段名，只有字段的类型

```js
struct Color(i32, i32, i32);
let black = Color(0, 0, 0);
```

## 类单元结构体

```js
struct AlwaysEqual;
let subject = AlwaysEqual;
```

## 调试打印结构体

 宏能处理很多类型的格式，不过，{} 默认告诉 println! 使用被称为 Display 的格式

基本类型都默认实现了 Display，结构体，println! 应该用来输出的格式是不明确的，使用叫做 Debug 的输出格式

```js
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}
let rect1 = Rectangle {
    width: 30,
    height: 50,
};
println!("rect1 is {:?}", rect1);
// rect1 is Rectangle { width: 30, height: 50 }
println!("rect1 is {:#?}", rect1);
// rect1 is Rectangle {
//    width: 30,
//    height: 50,
//}
```

使用 dbg! 宏打印：打印出代码中调用 dbg! 宏时所在的文件和行号，以及该表达式的结果值，并返回该值的所有权

```js
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}
let scale = 3;
let rect1 = Rectangle {
    width: dbg!(30 * scale), // dbg! 返回表达式的值的所有权
    height: 50,
};
dbg!(&rect1); // 不希望 dbg! 拥有 rect1 的所有权，传入变量引用
```

打印如下：

```js
[src/main.rs:10] 30 * scale = 60
[src/main.rs:14] &rect1 = Rectangle {
    width: 60,
    height: 50,
}
```



调用 `dbg!` 宏会打印到标准错误控制台流（`stderr`），与 `println!` 不同，后者会打印到标准输出控制台流（`stdout`）

## 方法

方法与函数不同：

- 在结构体的上下文中被定义（或者是枚举或 trait 对象的上下文）
- 第一个参数总是 self，代表调用该方法的结构体实例

```js
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```

- &self  是 self: &Self 的缩写

## 关联函数

- 所有在 impl 块中定义的函数被称为关联函数，与类型相关
- 每个结构体都允许拥有多个 impl 块

- 可以定义不以 self 为第一参数的关联函数（不是方法，并不作用于一个结构体的实例）

  - 不是方法的关联函数经常被用作返回一个结构体新实例的构造函数

  - 这些函数的名称通常为 new，new 不是关键字
    ```js
    impl Rectangle {
        fn square(size: u32) -> Self {
            Self {
                width: size,
                height: size,
            }
        }
    }
    let sq = Rectangle::square(3);
    ```

    

# 枚举

## 基础用法

```js
enum IpAddrKind {
    V4, // 成员
    V6,
}
let four = IpAddrKind::V4;
let six = IpAddrKind::V6;

// 枚举成员关联类型类型
enum IpAddr {
    V4(String), // 成员是构建枚举实例的函数
    V6(String),
}

let home = IpAddr::V4(String::from("127.0.0.1"));
let loopback = IpAddr::V6(String::from("::1"));
```

一个枚举的成员中可以内嵌多种多样的类型

```js
enum Message {
    Quit, // 没有关联任何数据
    Move { x: i32, y: i32 }, // 类似结构体包含命名字段
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

## 方法

类似结构体定义方法

```js
impl Message {
     fn call(&self) {
     }
}

let m = Message::Write(String::from("hello"));
m.call();
```

## Option 枚举

- 已预导入，定义与标准库中
  ```js
  enum Option<T> {
      None,
      Some(T),
  }
  ```

- `Option<T>` 与 T 不是同一种类型
- 成员不需要 Option:: 方法调用

```js
let some_number = Some(5);
let some_char = Some('e');
let absent_number: Option<i32> = None;
```

match 是处理枚举的控制流结构

# 模块化

## crate

- crate 是 Rust 在编译时最小的代码单位
- crate 有两种形式：二进制项和库
  - 二进制项必须有一个 main 函数
  - 库并没有 main 函数，不会编译为可执行程序

## 包

- 包是提供一系列功能的一个或者多个 crate
- 一个包会包含一个 Cargo.toml 文件
  - Cargo 就是一个包含构建你代码的二进制项的包，约定
    - src/main.rs 与包同名的二进制 crate 的 crate 根
    -  src/lib.rs 与包同名的库 crate 的 crate 根
  - 包中可以包含至多一个库 crate
  - 包中可以包含任意多个二进制 crate，但是必须至少包含一个 crate（库或者二进制）

## 模块

模块可以将相关的定义放在一组；可以通过模块树展示出模块之间的关系

- pub：使项变为公有
  - 默认所有项（函数、方法、结构体、枚举、模块和常量）对父模块都是私有的
  - 父模块中的项不能使用子模块中的私有项，但是子模块中的项可以使用他们父模块中的项
  - 模块公有并不使其内容也是公有的
  - 结构体公有，属性仍然是私有的
  - 枚举公有，成员全部公有
- mod：声明模块

```js
pub mod garden; // 寻找模块路径：当前模块/garden.rs、当前模块/garden/mod.rs

mod serving { // 内联模块，就在大括号中
    fn test1() {}
}

// 模块内部还可以定义模块
mod model1 {
    mode mode1_1 {
        let num1 = 9;
        fn test1() {};
    }
}
```

### 模块路径

绝对路径：以 crate 根开头的全路径

相对路径：从当前模块开始，以 self、super 或当前模块的标识符开头

```js
mod front_of_house {
    pub mod hosting { // 模块公有，让 front_of_house::hosting 可用
        pub fn add_to_waitlist() {} // 函数公有，让 hosting::add_to_waitlist 可用
    }
}

// 可以在这里：use crate::xxx::front_of_house::hosting;
// 然后在 eat_at_restaurant 内部直接 hosting::add_to_waitlist();
pub fn eat_at_restaurant() {
    // 绝对路径
    crate::front_of_house::hosting::add_to_waitlist();

    // 相对路径
    front_of_house::hosting::add_to_waitlist();
}
```

self：当前模块

super：当前模块的父模块

### use

use 用于创建成员，减少长路径的重复

- use x::y::z::n; 使用时直接 n()
- use 只能创建 use 所在的特定作用域内的短路径
- 引入函数使用时，一般引入到函数所在的模块名，然后使用：模块::函数名()
- 引入结构体、枚举和其他项时，习惯指定它们的完整路径。但如果多个末级名称一致时，
  - 引入截止到所在模块名
  - 使用 as 关键字提供新的名称：use x:y:n:n as myN;

在 main.rs 同级建一个 test.rs 

main.rs

```js
use test::mod_test::mod_test_1;
pub mod test;
fn main() {
    mod_test_1::test_1_fn();
}
```

test.rs【将这个模块拆分为多个文件：src/test.rs（含有语句 pub mod mod_test;）、src/test/mod_test.rs（含有语句 pub mod mod_test_1;）、src/test/mod_test/mode_test_1.rs（含有函数 test_1_f n）】

```js
pub mod mod_test {
  pub mod mod_test_1 { 
      pub fn test_1_fn() {
          println!("test_1_fn")
      }
  }
}
```

### pub use

use：将名称导入当前作用域

pub use：不仅将名称导入当前作用域，还继续导出了该名称（重导出）

### 合并 use 语句

使用嵌套路径消除重复的 use 语句

```js
use std::cmp::Ordering;
use std::io;
// =>
use std::{cmp::Ordering, io};

use std::io;
use std::io::Write;
// =>
use std::io::{self, Write};

// 将一个路径下 所有 公有项引入作用域 - glob 运算符
use std::collections::*;
// 常用于测试模块 tests 中
```

# 错误处理

## panic! 处理不可恢复错误

### 什么情况出现此类错误

表现：打印出一个错误信息，展开并清理栈数据，然后退出程序了

1. 访问超过数组结尾的内容，如 verctor 只有 2 个，却访问第 10 个
2. 显性调用 panic! 宏，如 panic!("提示信息");

### 不清理数据配置

Cargo.toml 中

```js
[profile.release]
panic = 'abort'
// unwinding 展开，默认：回溯栈并清理它遇到的每一个函数的数据
// abort 终止：不清理数据就退出程序，程序所使用的内存需要由操作系统来清理 - 项目的最终二进制文件变小
```

## Result 处理可恢复错误

match 表达式处理返回 Result 成员的情况，处理可能的报错



# 泛型

- 泛型是具体类型或其他属性的抽象替代，可以减少代码冗余
- 泛型并不会使程序比具体类型运行得慢：编译时进行泛型代码的单态化来保证效率，即通过填充编译时使用的具体类型，将通用代码转换为特定代码的过程（编译为具体类型，无运行开销）

## 泛型函数

```js
fn largest<T>(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}
```

会报错，限制 T 只对实现了 PartialOrd 的类型有效后代码就可以编译了

## 泛型结构体

```js
// 共用类型
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let integer = Point { x: 5, y: 10 };
    let float = Point { x: 1.0, y: 4.0 };
}

// 不同类型
struct Point<T, U> {
    x: T,
    y: U,
}

fn main() {
    let both_integer = Point { x: 5, y: 10 };
    let both_float = Point { x: 1.0, y: 4.0 };
    let integer_and_float = Point { x: 5, y: 4.0 };
}
```

## 泛型枚举

```js
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

## 泛型方法

```js
struct Point<T> {
    x: T,
    y: T,
}

// 泛型方法，泛型与结构泛型相同
impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}
// 也可以为泛型指定限制，其他 T 不是 f32 类型的 Point<T> 实例则没有定义此方法
impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}

fn main() {
    let p = Point { x: 5, y: 10 };

    println!("p.x = {}", p.x());
}
```

泛型与结构体不同

```js
struct Point<X1, Y1> {
    x: X1,
    y: Y1,
}

impl<X1, Y1> Point<X1, Y1> {
    fn mixup<X2, Y2>(self, other: Point<X2, Y2>) -> Point<X1, Y2> {
        Point {
            x: self.x,
            y: other.y,
        }
    }
}

fn main() {
    let p1 = Point { x: 5, y: 10.4 };
    let p2 = Point { x: "Hello", y: 'c' };

    let p3 = p1.mixup(p2);

    println!("p3.x = {}, p3.y = {}", p3.x, p3.y); // p3.x = 5, p3.y = c
}
```

# trait

- 通过 trait 以一种抽象的方式定义共享的行为，类似于“接口”功能
  - trait 体中可以有多个方法
  - 可以只定义签名不实现内容：一行一个方法签名且都以分号结尾；每一个实现这个 trait 的类型都需要提供其自定义行为的方法体
  - 也可以有默认实现，实现这个 trait 的类型可以忽略这个方法

## 无默认实现与有默认实现

```js
// aggregator 
pub trait Summary {
    fn summarize(&self) -> String;
    // 也可以默认实现
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}
// 如果指定空的 impl 块，则表示 summarize 的逻辑走默认实现
impl Summary for NewsArticle {}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}
```

如果别的 crate 引入使用，trait 必须和类型一起引入作用域以便使用额外的 trait 方法

```js
use aggregator::{Summary, Tweet};

fn main() {
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    };

    println!("1 new tweet: {}", tweet.summarize());
}
```

## trait 作为参数

```js
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

只用实现了 Summary 这个 trait 的类型才能使用 notify 这个函数，因为里面调用了 summarize 方法

### trait bound

trait bound 就是上面那种 impl Trait 语法

trait bound 与泛型参数声明结合使用

```js
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}
```

### + 指定多个 trait bound

item 需要同时实现两个不同的 trait

```js
pub fn notify(item: &(impl Summary + Display)) {}
// 泛型的 trait bound
pub fn notify<T: Summary + Display>(item: &T) {}
```

###  where 简化 trait bound 的函数签名

```js
fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {}
// 简化
fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{}
```

## trait 作为返回值

```js
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    }
}
```

- 返回某个实现了 Summary trait 的类型（闭包和迭代器常用）
- 只适用于返回单一类型的情况，不能 if 返回 A else 返回 B

## 高级 trait

### 关联类型在 trait 定义中指定占位符类型

关联类型是一个将类型占位符与 trait 相关联的方式，这样 trait 的方法签名中就可以使用这些占位符类型

```
pub trait Iterator {
    type Item; // Item 是一个占位符类型

    fn next(&mut self) -> Option<Self::Item>; // 返回一个包含了占位符类型值的 Option
}

// Counter 结构体上实现 Iterator trait 
impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
    }
}
```

语法类似于泛型，但使用泛型时，则不得不在每一个实现中标注类型；关联类型，则无需标注类型，因为不能多次实现这个 trait

```
pub trait Iterator<T> {
    fn next(&mut self) -> Option<T>;
}
```

### 默认泛型类型参数和运算符重载

```
// 默认类型参数：如果实现 Add trait 时不指定 Rhs 的具体类型，Rhs 的类型将是默认的 Self 类型
trait Add<Rhs=Self> {
    type Output;

    fn add(self, rhs: Rhs) -> Self::Output;
}

use std::ops::Add;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}
// 为 Point 实现 Add 时，使用了默认的 Rhs
impl Add for Point {
    type Output = Point;

    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

fn main() {
    assert_eq!(
        Point { x: 1, y: 0 } + Point { x: 2, y: 3 },
        Point { x: 3, y: 3 }
    );
}
```

将毫米值与米值相加，自定义 Rhs 类型而不是使用默认类型

```
use std::ops::Add;

struct Millimeters(u32);
struct Meters(u32);

impl Add<Meters> for Millimeters {
    type Output = Millimeters;

    fn add(self, other: Meters) -> Millimeters {
        Millimeters(self.0 + (other.0 * 1000))
    }
}
```

### 完全限定语法与消歧义：调用相同名称的方法

 trait Pilot 和 Wizard 都拥有方法 fly，在一个本身已经实现了名为 fly 方法的类型 Human 上实现这两个 trait

每一个 fly 方法都进行了不同的操作

```
trait Pilot {
    fn fly(&self);
}

trait Wizard {
    fn fly(&self);
}

struct Human;

impl Pilot for Human {
    fn fly(&self) {
        println!("This is your captain speaking.");
    }
}

impl Wizard for Human {
    fn fly(&self) {
        println!("Up!");
    }
}

impl Human {
    fn fly(&self) {
        println!("*waving arms furiously*");
    }
}
```

使用时，需要指定是哪一个

```
fn main() {
    let person = Human;
    person.fly(); // 默认调用直接实现在类型上的方法
    Pilot::fly(&person); // 显示指定：在方法名前指定 trait 
    Wizard::fly(&person);
}
```

不是方法的关联函数没有 self 参数，如上方式无法使用

```
trait Animal {
    fn baby_name() -> String;
}

struct Dog;

impl Dog {
    fn baby_name() -> String {
        String::from("Spot")
    }
}

impl Animal for Dog {
    fn baby_name() -> String {
        String::from("puppy")
    }
}

fn main() {
    println!("A baby dog is called a {}", Dog::baby_name()); // Spot 调用直接实现在类型上的方法
    println!("A baby dog is called a {}", <Dog as Animal>::baby_name()); // puppy 使用 完全限定语法-调用函数时最为明确的方式
}
```

完全限定语法定义为：`<Type as Trait>::function(receiver_if_method, next_arg, ...);`

### 父（超）trait

```
use std::fmt;

trait OutlinePrint: fmt::Display {
    fn outline_print(&self) {
        let output = self.to_string();
        let len = output.len();
        println!("{}", "*".repeat(len + 4));
        println!("*{}*", " ".repeat(len + 2));
        println!("* {} *", output);
        println!("*{}*", " ".repeat(len + 2));
        println!("{}", "*".repeat(len + 4));
    }
}

struct Point {
    x: i32,
    y: i32,
}
impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}
impl OutlinePrint for Point {}
```

### newtype 模式用以在外部类型上实现外部 trait



# 生命周期

Rust 中的每一个引用都有其生命周期，也就是引用保持有效的作用域

- 大部分可以推断
- 不同方式相关联的情况不能推断，使用泛型生命周期参数来注明它们的关系，确保运行时实际使用的引用绝对是有效的【生命周期语法是用于将函数的多个参数与其返回值的生命周期进行关联的】

## 函数声明周期注解

返回的引用的生命周期跟参数中较短的一个一致：

```js
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

## 结构体生命周期注解

ImportantExcerpt 的实例不能比其 part 字段中的引用存在的更久

```js
struct ImportantExcerpt<'a> {
    part: &'a str,
}
```

## 生命周期省略规则

函数或方法的参数的生命周期被称为输入生命周期，而返回值的生命周期被称为输出生命周期

第一条规则是编译器为每一个引用参数都分配一个生命周期参数。换句话说就是，函数有一个引用参数的就有一个生命周期参数：fn foo<'a>(x: &'a i32)，有两个引用参数的函数就有两个不同的生命周期参数，fn foo<'a, 'b>(x: &'a i32, y: &'b i32)，依此类推。

第二条规则是如果只有一个输入生命周期参数，那么它被赋予所有输出生命周期参数：fn foo<'a>(x: &'a i32) -> &'a i32。

第三条规则是如果方法有多个输入生命周期参数并且其中一个参数是 &self 或 &mut self，说明是个对象的方法 (method)，那么所有输出生命周期参数被赋予 self 的生命周期

## 方法的生命周期注解

```js
impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }
}
```

## 静态生命周期

'static，其生命周期能够存活于整个程序期间

所有的字符串字面值都拥有 'static 生命周期

```js
let s: &'static str = "I have a static lifetime.";
```

## 结合泛型类型参数、trait bounds 和生命周期

```js
use std::fmt::Display;

fn longest_with_an_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where
    T: Display,
{
    println!("Announcement! {}", ann);
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

# 测试

- Rust 中的测试就是一个带有 test 属性注解的函数，fn 行之前加上 #[test]

判断是相等的，相等的测试通过，否则失败

```js
#[test]
fn exploration() {
    assert_eq!(2 + 2, 4);
}
```

测试函数中如果手动调用 panic! 宏，测试失败

assert!(bool)：bool 为 true 通过，否则失败（自动调用调用 panic! 宏）

assert_ne!(v1, v2) 判断两个值不相等，失败时会打印左右两值

assert_eq!(v1, v2)判断两个值相等，失败时会打印左右两值

这三个函数测试失败时，会将可选的剩余参数传递给 format! 宏，用于测试失败时的一个信息提示



这个测试函数期待 panic，并且抛出的信息等于 expected 的值，如果成立，测试通过，否则测试不通过

```js
#[test]
#[should_panic(expected = "less than or equal to 100")]
fn greater_than_100() {
    Guess::new(200);
}
```

Result<T,E>

```JS
#[test]
fn it_works() -> Result<(), String> {
    if 2 + 2 == 4 {
        Ok(())
    } else {
        Err(String::from("two plus two does not equal four"))
    }
}
```

测试通过时返回 Ok(())，在测试失败时返回带有 String 的 Err

- 不能使用 #[should_panic] 注解
- 为了断言一个操作返回 Err 成员，不要使用对 Result<T, E> 值使用问号表达式（?）。而是使用 assert!(value.is_err())



## 常用测试命令

见 [Cargo](#Cargo)

- 忽略某个测试：在#[test] 之后增加了 #[ignore] 行
- 只运行被忽略的测试：cargo test -- --ignored

## 单元测试

- 更小而更集中，在隔离的环境中一次测试一个模块，或者是测试私有接口
- 单元测试的代码与要测试的源码放在 src 下的同一个文件中
- 需要 #[cfg(test)] 注解，只在执行 cargo test 时才编译和运行测试代码，build 的时候不应该包含进去

```
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
```

测试私有函数：在模块中使用 use super::* 将 tests 模块的父模块的所有模块（包括私有）都引入，然后可在 tests 模块中调用私有函数

## 集成测试

- 测试库的多个部分能否一起正常工作；对于你的库来说，完全是外部的
- src 同级目录创建一个 tests 目录，只会在运行 cargo test 时编译这个目录中的文件
- 在这个 tests 目录中创建任意多的测试文件，每一个测试文件都是独立的，需要在每一个文件中导入库
- 需要在文件顶部添加 use adder（这个 adder 是项目名称），但不需要#[cfg(test)]

```js
use adder;

#[test]
fn it_adds_two() {
    assert_eq!(4, adder::add_two(2));
}
```

- 单元测试、集成测试和文档测试，任何一个测试失败，之后的都不再运行

- cargo test --test 集成测试中的文件名：运行某个特定集成测试文件中的所有测试

- tests/common/mod.rs 公共工具函数能被其他多个集成测试文件中调用，如果是 tests/common.rs，运行测试时会打印 Running tests/common.rs running 0 tests
  ```js
  pub fn setup() {
      // setup code specific to your library's tests would go here
  }
  ```

  ```js
  use adder;
  
  mod common;
  
  #[test]
  fn it_adds_two() {
      common::setup();
      assert_eq!(4, adder::add_two(2));
  }
  ```

  如果项目是二进制 crate 并且只包含 src/main.rs 而没有 src/lib.rs，这样就不可能在 tests 目录创建集成测试并使用 extern crate 导入 src/main.rs 中定义的函数。只有库 crate 才会向其他 crate 暴露了可供调用和使用的函数；二进制 crate 只意在单独运行。

  这就是许多 Rust 二进制项目使用一个简单的 src/main.rs 调用 src/lib.rs 中的逻辑的原因之一。因为通过这种结构，集成测试 就可以 通过 extern crate 测试库 crate 中的主要功能了





# 命令行程序

## 获取命令行参数

```js
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    dbg!(args);
}
```



```js
cargo run -- needle haystack
打印：
[
    "target/debug/minigrep", // 执行的二进制文件的名称
    "needle",
    "haystack"
]
```

## 读取文件

```js
use std::fs;
use std::env;
fn main() {
    let args: Vec<String> = env::args().collect();

    let file_path = &args[2];
    let contents = fs::read_to_string(file_path)
            .expect("Should have been able to read the file");
    
    println!("With text:\n{contents}");
}
```

cargo run -- the poem.txt

根目录中创建 poem.txt

### 获取参数 - 普通函数改写为 new 函数

普通函数

```js
fn main() {
    let args: Vec<String> = env::args().collect();

    let config = parse_config(&args);

    println!("Searching for {}", config.query);
    println!("In file {}", config.file_path);

    let contents = fs::read_to_string(config.file_path)
        .expect("Should have been able to read the file");
}

struct Config {
    query: String,
    file_path: String,
}

fn parse_config(args: &[String]) -> Config {
    let query = args[1].clone(); // clone 消耗时间和内存
    let file_path = args[2].clone();

    Config { query, file_path }
}
```

new 函数

```js
fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::new(&args);

    // --snip--
}

// --snip--

impl Config {
    fn new(args: &[String]) -> Config {
        let query = args[1].clone();
        let file_path = args[2].clone();

        Config { query, file_path }
    }
}
```

### 获取参数 - 普通函数改写为返回 Result 的函数

> 许多程序员希望 new 函数永远不会失败

- 使用上的错误不应该调用 panic，更趋向于程序上的问题 - 处理参数不对问题
- main 中处理错误并退出

```js
impl Config {
    fn build(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("not enough arguments");
        }

        let query = args[1].clone();
        let file_path = args[2].clone();

        Ok(Config { query, file_path })
    }
}

use std::process;

fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::build(&args).unwrap_or_else(|err| {
        println!("Problem parsing arguments: {err}");
        process::exit(1);
    });

    // --snip--
}
```

clone  处理所有权- 完整拷贝，会比储存字符串数据的引用消耗更多的时间和内存

### 获取参数 - 迭代器替换 clone 等

迭代器更有效率处理所有权问题

```js
impl Config {
    pub fn build(
        mut args: impl Iterator<Item = String>,
    ) -> Result<Config, &'static str> {
	    // 第一个参数是程序的名称，不需要处理，忽略过值
        args.next();

        let query = match args.next() {
            Some(arg) => arg,
            None => return Err("Didn't get a query string"),
        };

        let file_path = match args.next() {
            Some(arg) => arg,
            None => return Err("Didn't get a file path"),
        };

        let ignore_case = env::var("IGNORE_CASE").is_ok();

        Ok(Config {
            query,
            file_path,
            ignore_case,
        })
    }
}

// main.rs
use std::env;
use std::process;

use minigrep::Config;

fn main() {
    let config = Config::build(env::args()).unwrap_or_else(|err| {
        eprintln!("Problem parsing arguments: {err}");
        process::exit(1);
    });

    // --snip--
}

```



### 读取文件 - if let

if let 和 unwrap_or_else 的函数体都一样：打印出错误并退出

run 在成功时返回 ()，这里只关心检测错误，所以并不需要 unwrap_or_else 来返回未封装的值

```js
use std::error::Error;

// --snip--

fn run(config: Config) -> Result<(), Box<dyn Error>> {
    // ? 会从函数中返回错误值并让调用者来处理它
    let contents = fs::read_to_string(config.file_path)?;

    println!("With text:\n{contents}");

    Ok(())
}
fn main() {
    // --snip--

    println!("Searching for {}", config.query);
    println!("In file {}", config.file_path);

    if let Err(e) = run(config) {
        println!("Application error: {e}");
        process::exit(1);
    }
}
```

### 将代码拆分到库 crate

将所有不是 main 函数的代码从 src/main.rs 移动到新文件 src/lib.rs 中

src/lib.rs

```js
use std::error::Error;
use std::fs;

pub struct Config {
    pub query: String,
    pub file_path: String,
}

impl Config {
    pub fn build(args: &[String]) -> Result<Config, &'static str> {
        // --snip--
    }
}

pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
    // --snip--
}
```

src/main.rs

```js
use std::env;
use std::process;

use minigrep::Config; // 项目名称叫做 minigrep 

fn main() {
    // --snip--
    if let Err(e) = minigrep::run(config) {
        // --snip--
    }
}
```

# 闭包

- 闭包是可以保存在一个变量中或作为参数传递给其他函数的匿名函数
- 闭包不要求像 fn 函数那样在参数和返回值上注明类型
  - 函数暴露给外面使用，需要保证参数与返回值的类型的定义与使用理解一致
  - 闭包不需要暴露
- 可以添加类型标注，不添加也没事，编译器会为闭包定义中的每个参数和返回值推断一个具体类型

```js
// 函数定义
fn  add_one_v1   (x: u32) -> u32 { x + 1 }
// 完整标注的闭包定义
let add_one_v2 = |x: u32| -> u32 { x + 1 };
// 省略了类型注解的闭包
let add_one_v3 = |x|             { x + 1 };
// 去掉可选大括号的闭包
let add_one_v4 = |x|               x + 1  ;
```

- 调用一个被推断为两个不同类型的闭包会报错

## 捕获不可变引用的闭包

```js
fn main() {
    let list = vec![1, 2, 3];
    println!("Before defining closure: {:?}", list);

    let only_borrows = || println!("From closure: {:?}", list);

    println!("Before calling closure: {:?}", list);
    only_borrows();
    println!("After calling closure: {:?}", list);
}
```

## 捕获可变引用的闭包

```js
fn main() {
    let mut list = vec![1, 2, 3];
    println!("Before defining closure: {:?}", list);

    let mut borrows_mutably = || list.push(7);
	// 当可变借用存在时不允许有其它的借用，所以在闭包定义和调用之间不能有不可变引用来进行打印
    // 所以这里不能打印 list
    borrows_mutably();
    println!("After calling closure: {:?}", list);
}
```

## `move` 闭包生成新的线程

```js
use std::thread;

fn main() {
    let list = vec![1, 2, 3];
    println!("Before defining closure: {:?}", list);

    thread::spawn(move || println!("From thread: {:?}", list))
        .join()
        .unwrap();
}
```

- move 指明 list 被移动到闭包中
- 去掉 move 编译会报错
- 闭包定义后在主线程中使用 list 也会报错

## FnOnce 能被调用一次的闭包

- 所有闭包都至少实现了这个 trait
- 会将捕获的值移出闭包体的闭包
- 只能调用一次

## FnMut 可以被调用多次

- 不会将捕获的值移出闭包体的闭包
- 可能修改被捕获的值

```js
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let mut list = [
        Rectangle { width: 10, height: 1 },
        Rectangle { width: 3, height: 5 },
        Rectangle { width: 7, height: 12 },
    ];

    let mut num_sort_operations = 0;
    list.sort_by_key(|r| {
        num_sort_operations += 1;
        r.width
    });
    println!("{:#?}, sorted in {num_sort_operations} operations", list);
}
```



## Fn 不从环境中捕获值的闭包

- 既不将被捕获的值移出闭包体也不修改被捕获的值的闭包
- 可以被调用多次而不改变它们的环境
- 适用于多次并发调用闭包

# 迭代器

迭代器负责遍历序列中的每一项和决定序列何时结束的逻辑

Rust 中，迭代器是惰性的，这意味着在调用方法使用迭代器之前它都不会有效果

```js
fn main() {
    let v1 = vec![1, 2, 3];

    let v1_iter = v1.iter();
    // 上面还没有调用迭代器，所以上面的代码本身没啥用处
    // for 循环会获取 v1_iter 的所有权并在后台使 v1_iter 可变
    for val in v1_iter {
        println!("Got: {}", val); // 遍历打印出 1 2 3
    }
}

```

可以直接调用迭代器的 next 方法，需要主要迭代器变量需要定义为可变的

```js
#[cfg(test)]
mod tests {
    #[test]
    fn iterator_demonstration() {
        let v1 = vec![1, 2, 3];
		// 在迭代器上调用 next 方法改变了迭代器中用来记录序列位置的状态，v1_iter 需要是可变的
        let mut v1_iter = v1.iter();
		// 每一个 next 调用都会从迭代器中消费一个项
        // next 调用中得到的值是 vector 的不可变引用
        // iter 方法生成一个不可变引用的迭代器
        assert_eq!(v1_iter.next(), Some(&1));
        assert_eq!(v1_iter.next(), Some(&2));
        assert_eq!(v1_iter.next(), Some(&3));
        assert_eq!(v1_iter.next(), None);
    }
}

```

- `iter()` 生成一个不可变引用的迭代器
- `into_iter()` 生成一个可变引用的迭代器，可以获取所有权并返回拥有所有权的迭代器

## 消费适配器的方法

### sum

获取迭代器的所有权并反复调用 next 来遍历迭代器

```js
#[cfg(test)]
mod tests {
    #[test]
    fn iterator_sum() {
        let v1 = vec![1, 2, 3];

        let v1_iter = v1.iter();

        let total: i32 = v1_iter.sum();
        // 调用 sum 之后不再允许使用 v1_iter 因为调用 sum 时它会获取迭代器的所有权

        assert_eq!(total, 6);
    }
}

```

### collect

```js
fn main() {
    let v1: Vec<i32> = vec![1, 2, 3];

    let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();

    assert_eq!(v2, vec![2, 3, 4]);
}
```

- map 方法使用闭包来调用每个元素以生成新的迭代器
- collect 方法消费迭代器并将结果收集到一个数据结构中

## 性能：循环 vs 迭代器

迭代器是 Rust 的零成本抽象之一，意味着抽象并不会引入运行时开销

大胆的使用迭代器和闭包，它们使得代码看起来更高级，但并不为此引入运行时性能损失

# 发布 crate

1. 在 [crates.io](https://crates.io/) 上注册账号，可使用 github 登录

2. 在账户设置页面并获取 API token

3. 运行 cargo login api_token 进行登录，这个 token 会储存在本地的 `~/.cargo/credentials` 文件中【token 应私有】

4. 准备发布的 crate 内容

5. 给 crate 添加元信息可以帮助你的 crate 更容易被发现和使用，在 Cargo.toml 中
   ```
   [package]
   name = "project_name"
   version = "0.1.0"
   edition = "2021"
   description = "A fun game where you guess what number the computer has chosen."
   license = "MIT OR Apache-2.0"
   
   [dependencies]
   
   ```

   - name 需要唯一

6. 发布：cargo publish

   - 发布是永久性的，对应版本不可能被覆盖，其代码也不可能被删除
   - 如果是发布新版本，则使用语义化规则升级版本号 version

7. 撤回某个版本：cargo yank --vers 1.0.1

   - 撤回则所有带有 Cargo.lock 的项目的依赖不会被破坏，即现存此依赖的项目仍然能够下载和依赖这个版本
   - 任何新生成的 Cargo.lock 将不能使用被撤回的版本
   - 撤销撤回操作：cargo yank --vers 1.0.1 --undo

# 工作空间 - 管理多个协同开发的包

工作区间下有一个二进制项目和一个库

```
test
├─ adder
│  ├─ Cargo.toml
│  └─ src
│     └─ main.rs
├─ add_one
│  ├─ Cargo.toml
│  └─ src
│     └─ lib.rs
├─ Cargo.lock
├─ Cargo.toml
└─ target
```

1. 新建 test 目录当做项目根目录

2. 根目录下新建 Cargo.toml

   ```js
   [workspace]
   
   members = [
     "adder",
     "add_one"
   ]
   ```

3. 运行 cargo new adder，创建 adder 这个二进制项目，src 下是 main.rs

4. 运行 cargo new --lib add_one，创建 add_one 这个库，src 下是 lib.rs

5. 二进制项目与库的 toml 初始如下
   ```
   [package]
   name = "add_one"
   version = "0.1.0"
   edition = "2021"
   
   [dependencies]
   ```

6. 在二进制项目中引入库函数使用

   - adder/Cargo.toml 中引入依赖
     ```
     [dependencies]
     add_one = { path = "../add_one" }
     ```

   - adder/src/main.rs 中使用库函数
     ```
     use add_one;
     
     fn main() {
         let num = 10;
         println!("Hello, world! {num} plus one is {}!", add_one::add_one(num));
     }
     ```

   - add_one/src/lib.rs 中的函数
     ```
     pub fn add_one(x: i32) -> i32 {
         x + 1
     }
     ```

   - 构建工作空间 cargo build，构建结果是在根目录下的 target 中 -- 共享一个 target，避免重复构建

     - 就算在各自的包下运行 cargo build，构建结果也是在根目录下的 target 中

   - 运行二进制项目：cargo run -p adder

7. 给库添加测试，add_one/src/lib.rs
   ```
   pub fn add_one(x: i32) -> i32 {
       x + 1
   }
   
   #[cfg(test)]
   mod tests {
       use super::*;
   
       #[test]
       fn it_works() {
           assert_eq!(3, add_one(2));
       }
   }
   ```

   - 运行工作区间所有测试：cargo test
   - 运行某个包下的测试：cargo test -p add_one

# 指针

> 指针：一个包含内存地址的变量

指针：除了引用数据没有任何其他特殊功能，也没有额外开销

- 引用，以 & 为标志

智能指针：一类数据结构，表现类似指针；拥有额外的元数据和功能

- String
- Vec<T>
- Box<T>，用于在堆上分配值
- Rc<T>，一个引用计数类型，其数据可以有多个所有者
- Ref<T> 和 RefMut<T>，通过 RefCell<T> 访问。（ RefCell<T> 是一个在运行时而不是在编译时执行借用规则的类型）

## 指针 vs 智能指针

- 引用是一类只借用数据的指针
- 在大部分情况下，智能指针拥有它们指向的数据

## 结构体 vs 智能指针

智能指针通常使用结构体实现

智能指针不同于结构体的地方在于其实现了 Deref 和 Drop trait

- Deref trait：允许智能指针结构体实例表现的像引用一样，这样就可以编写既用于引用、又用于智能指针的代码
- Drop trait：允许自定义当智能指针离开作用域时运行的代码

- 

## 递归数据

`Box<T>`，`Rc<T>` 或 `RefCell<T>`：

- `Rc<T>` 允许相同数据有多个所有者；`Box<T>` 和 `RefCell<T>` 有单一所有者。
- `Box<T>` 允许在编译时执行不可变或可变借用检查；`Rc<T>`仅允许在编译时执行不可变借用检查；`RefCell<T>` 允许在运行时执行不可变或可变借用检查。
- 因为 `RefCell<T>` 允许在运行时执行可变借用检查，所以我们可以在即便 `RefCell<T>` 自身是不可变的情况下修改其内部的值

### 智能指针 box 定义递归

> 最简单直接的智能指针 box

- 类型是 Box<T>
- box 本身位于栈上，指向的数据位于堆上
- 可以用于定义递归数据

使用智能指针 box 定义递归数据类型

```js
enum List {
    // Cons 存放一个 Box 所以 List 不是无限大小的了
    Cons(i32, Box<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
}
```

- Nil：代表递归的终止条件，宣布列表的终止

- 上面的 Box 能正常编译，rust 能计算出类型大小，而不使用 box 的话没法计算，编译报错
  ```js
  use crate::List::{Cons, Nil};
  
  fn main() {
      let list = Cons(1, Cons(2, Cons(3, Nil)));
  }
  ```

### 引用计数智能指针Rc<T> 共享数据

> 记录一个值的引用数量来知晓这个值是否仍在被使用
>
> Rc<T> 只能用于单线程场景
>
> 通过不可变引用， Rc<T> 允许在程序的多个部分之间只读地共享数据【不允许可变引用】

示例：递归数据 a，递归数据 b、c 中有一部分是 a

```js
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let a = Cons(5, Box::new(Cons(10, Box::new(Nil))));
    let b = Cons(3, Box::new(a)); // a 被移动进了 b 这样 b 就拥有了 a
    let c = Cons(4, Box::new(a)); // c 不能再使用 a 了
}
```

Box 改为 Rc

```js
enum List {
    // 每一个 Cons 变量都包含一个值和一个指向 List 的 Rc<T>
    Cons(i32, Rc<List>),
    Nil,
}

use crate::List::{Cons, Nil};
use std::rc::Rc;

fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
	// 克隆 a 所包含的 Rc<List>，这会将引用计数从 1 增加到 2 并允许 a 和 b 共享 Rc<List> 中数据的所有权
    let b = Cons(3, Rc::clone(&a));
    // 克隆 a，将引用计数从 2 增加为 3
    let c = Cons(4, Rc::clone(&a));
}
```

- Rc::clone(&a) 也可以写成 a.clone，前者是 rust 习惯写法
- Rc::clone 不是进行深拷贝，而是增加引用计数，不会花费多少时间
- 每次调用 Rc::clone，Rc<List> 中数据的引用计数都会增加，直到有零个引用之前其数据都不会被清理
- 获取引用计数：Rc::strong_count(&a)
- Rc<T> 允许一个值有多个所有者，引用计数则确保只要任何所有者依然存在其值也保持有效

### RefCell<T> 和内部可变性模式

> 内部可变性：一个设计模式
>
> - 它允许你即使在有不可变引用时也可以改变数据（在不可变值内部改变值就是内部可变性模式）
> - 使用 unsafe 代码来模糊 Rust 通常的可变性和借用规则

>  RefCell<T> 代表其数据的唯一的所有权
>
> RefCell<T> 只能用于单线程场景

借用规则：

- 在任意给定时刻，只能拥有一个可变引用或任意数量的不可变引用 之一（而不是两者）
- 引用必须总是有效的

对于 RefCell<T>，这些不可变性作用于运行时；如果违反这些规则程序会 panic 并退出

对于引用和 Box<T>，借用规则的不可变性作用于编译时；如果违反这些规则，会得到一个编译错误

#### 内部可变性：不可变值的可变借用

```js
fn main() {
    let x = 5;
    // 当有一个不可变值时，不能可变地借用它
    let y = &mut x;
}
```

在外部值被认为是不可变的情况下修改内部值

```js
pub trait Messenger {
    fn send(&self, msg: &str);
}

pub struct LimitTracker<'a, T: Messenger> {
    messenger: &'a T,
    value: usize,
    max: usize,
}

impl<'a, T> LimitTracker<'a, T>
where
    T: Messenger,
{
    pub fn new(messenger: &'a T, max: usize) -> LimitTracker<'a, T> {
        LimitTracker {
            messenger,
            value: 0,
            max,
        }
    }

    pub fn set_value(&mut self, value: usize) {
        self.value = value;

        let percentage_of_max = self.value as f64 / self.max as f64;

        if percentage_of_max >= 1.0 {
            self.messenger.send("Error: You are over your quota!");
        } else if percentage_of_max >= 0.9 {
            self.messenger
                .send("Urgent warning: You've used up over 90% of your quota!");
        } else if percentage_of_max >= 0.75 {
            self.messenger
                .send("Warning: You've used up over 75% of your quota!");
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::cell::RefCell;

    struct MockMessenger {
        sent_messages: RefCell<Vec<String>>,
    }

    impl MockMessenger {
        fn new() -> MockMessenger {
            MockMessenger {
                sent_messages: RefCell::new(vec![]),
            }
        }
    }

    impl Messenger for MockMessenger {
        fn send(&self, message: &str) {
            self.sent_messages.borrow_mut().push(String::from(message));
        }
    }

    #[test]
    fn it_sends_an_over_75_percent_warning_message() {
        let mock_messenger = MockMessenger::new();
        let mut limit_tracker = LimitTracker::new(&mock_messenger, 100);

        limit_tracker.set_value(80);

        assert_eq!(mock_messenger.sent_messages.borrow().len(), 1);
    }
}
```



- borrow 方法返回 Ref<T> 类型的智能指针
- borrow_mut 方法返回 RefMut<T> 类型的智能指针
- RefCell<T> 记录当前有多少个活动的 Ref<T> 和 RefMut<T> 智能指针。每次调用 borrow，RefCell<T> 将活动的不可变借用计数加一
- RefCell<T> 在任何时候只允许有多个不可变借用或一个可变借用

#### 使用 `Rc<RefCell<i32>>` 创建可以修改的 `List`

```js
#[derive(Debug)]
enum List {
    Cons(Rc<RefCell<i32>>, Rc<List>),
    Nil,
}

use crate::List::{Cons, Nil};
use std::cell::RefCell;
use std::rc::Rc;

fn main() {
    let value = Rc::new(RefCell::new(5));

    // a 和 value 都拥有 5 的所有权，不是所有权移动或者借用
    let a = Rc::new(Cons(Rc::clone(&value), Rc::new(Nil)));

    let b = Cons(Rc::new(RefCell::new(3)), Rc::clone(&a));
    let c = Cons(Rc::new(RefCell::new(4)), Rc::clone(&a));

    // 对 value 调用了 borrow_mut，返回 RefMut<T> 智能指针
    // 使用了自动解引用来解引用 Rc<T> 以获取其内部的 RefCell<T> 值
    *value.borrow_mut() += 10;

    println!("a after = {:?}", a);
    println!("b after = {:?}", b);
    println!("c after = {:?}", c);
    // a after = Cons(RefCell { value: 15 }, Nil)
    // b after = Cons(RefCell { value: 3 }, Cons(RefCell { value: 15 }, Nil))
    // c after = Cons(RefCell { value: 4 }, Cons(RefCell { value: 15 }, Nil))
}
```

### 引用循环

```js
use crate::List::{Cons, Nil};
use std::cell::RefCell;
use std::rc::Rc;

#[derive(Debug)]
enum List {
    Cons(i32, RefCell<Rc<List>>),
    Nil,
}

impl List {
    fn tail(&self) -> Option<&RefCell<Rc<List>>> {
        match self {
            Cons(_, item) => Some(item),
            Nil => None,
        }
    }
}
fn main() {
    let a = Rc::new(Cons(5, RefCell::new(Rc::new(Nil))));

    println!("a initial rc count = {}", Rc::strong_count(&a));
    println!("a next item = {:?}", a.tail());

    let b = Rc::new(Cons(10, RefCell::new(Rc::clone(&a))));

    println!("a rc count after b creation = {}", Rc::strong_count(&a));
    println!("b initial rc count = {}", Rc::strong_count(&b));
    println!("b next item = {:?}", b.tail());

    if let Some(link) = a.tail() {
        *link.borrow_mut() = Rc::clone(&b);
    }

    println!("b rc count after changing a = {}", Rc::strong_count(&b));
    println!("a rc count after changing a = {}", Rc::strong_count(&a));
    
    // 这里会循环打印，内存溢出
    println!("a next item = {:?}", a.tail());
}
```

#### 避免引用循环：将 `Rc<T>` 变为 `Weak<T>`

- Rc::clone 会增加 Rc<T> 实例的 strong_count，只在其 strong_count 为 0 时才会被清理的 Rc<T> 实例
- 调用 Rc::downgrade 并传递 Rc<T> 实例的引用可以创建其值的弱引用
  - weak_count 加 1，记录其存在多少个 Weak<T> 引用；strong_count 不变
  - 强引用代表如何共享 Rc<T> 实例的所有权
  - 弱引用并不属于所有权关系，当 Rc<T> 实例被清理时其计数没有影响
  - weak_count 无需计数为 0 就能使 Rc<T> 实例被清理，不会造成引用循环，任何弱引用的循环会在其相关的强引用计数为 0 时被打断

#### 树形数据结构

```js
use std::cell::RefCell;
use std::rc::Rc;

#[derive(Debug)]
struct Node {
    value: i32,
    children: RefCell<Vec<Rc<Node>>>,
}
fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        children: RefCell::new(vec![]),
    });
	// 可以通过 branch.children 从 branch 中获得 leaf
    let branch = Rc::new(Node {
        value: 5,
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });
}
```

使用 Weak<T> 增加从子到父的引用

```js
use std::cell::RefCell;
use std::rc::{Rc, Weak};

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}
fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });
	// leaf: strong_count = 1, weak_count = 0

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());

    let branch = Rc::new(Node {
        value: 5,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });

	// branch: strong_count = 1, weak_count = 0

	// 子节点就能够引用其父节点，但不拥有其父节点
    *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());

	// branch: strong_count = 1, weak_count = 1（因为 leaf.parent 通过 Weak<Node> 指向 branch）
    // leaf: strong_count = 2, weak_count = 0（branch 的 branch.children 中储存了 leaf 的 Rc<Node> 的拷贝）
}
```

打印

```
leaf parent = None
leaf parent = Some(Node { value: 5, parent: RefCell { value: (Weak) }, children: RefCell { value: [Node { value: 3, parent: RefCell { value: (Weak) }, children: RefCell { value: [] } }] } })
```



## Deref trait 将智能指针当做常规引用处理

实现 Deref trait 允许重载解引用运算符 *

```js
fn main() {
    // 变量 x 存放了一个 i32 值 5
    let x = 5;
    // y 等于 x 的一个引用
    let y = &x;

    assert_eq!(5, x);
    // *y 来追踪引用所指向的值（也就是解引用）
    // 解引用了 y，就可以访问 y 所指向的整型值并可以与 5 做比较
    assert_eq!(5, *y);
    // assert_eq!(5, y); 数字的引用与数字是不同类型，不允许比较
}
```

像引用一样使用 Box<T>

```js
fn main() {
    let x = 5;
    // 将 y 设置为一个指向 x 值拷贝的 Box<T> 实例，而不是指向 x 值的引用
    let y = Box::new(x);

    assert_eq!(5, x);
    // 使用解引用运算符追踪 Box<T> 的指针
    assert_eq!(5, *y);
}
```

### 自定义智能指针

```js
struct MyBox<T>(T);

impl<T> MyBox<T> {
    // 获取一个 T 类型的参数并返回一个存放传入值的 MyBox 实例
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}
```

实现 Deref trait

```js
use std::ops::Deref;

impl<T> Deref for MyBox<T> {
    type Target = T;
	// 实现名为 deref 的方法
    fn deref(&self) -> &Self::Target {
        // 借用 self 并返回一个内部数据的引用
        // 返回了通过 * 运算符访问的值的引用
        &self.0
        // 如果直接返回值而不是值的引用，其值（的所有权）将被移出 self
    }
}
```

- `*`运算符：替换为先调用 deref 方法再进行普通解引用的操作 `*y => *(y.deref())`

- 这里 MyBox 实现了 Deref trait，可以将 &Mybox<String> 类型的值作为实参，传给形参类型是 &str 的函数

  - MyBox 的 deref 返回 &String

  - 标准库中 String 上的 Deref 实现将返回 &str（字符串 slice）

  - 也就是 Deref 可以实现函数和方法的隐式类型转换

    ```js
    fn hello(name: &str) {
        println!("Hello, {name}!");
    }
    fn main() {
        let m = MyBox::new(String::from("Rust"));
        // 如果 MyBox 实现了 Deref
        hello(&m);
        // 如果 MyBox 没有实现 Deref，则需要这么调用
        hello(&(*m)[..]);
    }
    ```

像引用一样使用 MyBox<T>

```js
fn main() {
    let x = 5;
    let y = MyBox::new(x);

    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```



### Deref 强制类型转换

实现了 Deref trait 的类型，作为实参传递给类型不同的形参时，有一系列 deref 方法被调用，进行类型转换

进行 Deref 强制转换的场景

- 当 T: Deref<Target=U> 时从 &T 到 &U
- 当 T: DerefMut<Target=U> 时从 &mut T 到 &mut U
- 当 T: Deref<Target=U> 时从 &mut T 到 &U

## Drop Trait 清理代码

> 允许在值要离开作用域时执行一些代码，代码被用于释放类似于文件或网络连接的资源

- 要求实现一个叫做 drop 的方法，这个方法叫做析构函数（destructor），反义词对应创建实例的构造函数
- 实例离开作用域 Rust 会自动调用 drop
- 变量以被创建时相反的顺序被丢弃

### 提前丢弃值

- rust 不允许主动调用 Drop trait 的 drop 方法，因为 rust 会自动调用，导致重复
- 可以使用 std::mem::drop 实现提前丢弃值，参数是希望强制丢弃的值



# 并发和并行

并发编程：程序的不同部分相互独立地执行

并行编程：程序不同部分同时执行

## 线程

程序内部，可以拥有多个同时运行的独立部分，这些运行这些独立部分的功能被称为线程

- 多个线程可以改善性能
- 因为线程是同时运行的，所以无法预先保证不同线程中的代码的执行顺序
  - 竞态条件（Race conditions），多个线程以不一致的顺序访问数据或资源
  - 死锁（Deadlocks），两个线程相互等待对方，这会阻止两者继续运行
  - 只会发生在特定情况且难以稳定重现和修复的 bug

### 创建新线程

```js
use std::thread;
use std::time::Duration;

fn main() {
    // ①
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });
	// ②
    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
    // ③
}
```

- thread::sleep 强制线程停止执行一小段时间，会允许其他不同的线程运行

- 上面的程序主线程先打印。当 Rust 程序的主线程结束时，新线程也会结束，而不管其是否执行完毕。打印如下
  ```
  hi number 1 from the main thread!
  hi number 1 from the spawned thread!
  hi number 2 from the main thread!
  hi number 2 from the spawned thread!
  hi number 3 from the spawned thread!
  hi number 3 from the main thread!
  hi number 4 from the spawned thread!
  hi number 4 from the main thread!
  hi number 5 from the spawned thread!
  ```

- thread::spawn 的返回值类型是 JoinHandle，JoinHandle 是一个拥有所有权的值，当对其调用 join 方法时，它会等待其线程结束
  ```rs
  // ①
  let handle = thread::spawn(...);
  ... // 主线程代码
  // ③
  handle.join().unwrap(); // 阻塞当前线程直到 handle 所代表的线程结束，确保新建线程在 main 退出前结束运行
  // 阻塞线程意味着阻止该线程执行工作或退出，打印如下
  hi number 1 from the spawned thread!
  hi number 2 from the main thread!
  hi number 2 from the spawned thread!
  hi number 3 from the spawned thread!
  hi number 3 from the main thread!
  hi number 4 from the main thread!
  hi number 4 from the spawned thread!
  hi number 5 from the spawned thread!
  hi number 6 from the spawned thread!
  hi number 7 from the spawned thread!
  hi number 8 from the spawned thread!
  hi number 9 from the spawned thread!
  ```

- 上面 join 在主线程打印之后，主线程与分线程交互执行，如果在主线程之前执行 join，则分线程执行完成后才执行主线程
  ```js
  // ①
  let handle = thread::spawn(...);
  // ②
  handle.join().unwrap();
  ... // 主线程代码
  hi number 1 from the spawned thread!
  hi number 2 from the spawned thread!
  hi number 3 from the spawned thread!
  hi number 4 from the spawned thread!
  hi number 5 from the spawned thread!
  hi number 6 from the spawned thread!
  hi number 7 from the spawned thread!
  hi number 8 from the spawned thread!
  hi number 9 from the spawned thread!
  hi number 1 from the main thread!
  hi number 2 from the main thread!
  hi number 3 from the main thread!
  hi number 4 from the main thread!
  ```

### move 新建线程中使用来自于主线程的数据

```
fn main() {
    let v = vec![1, 2, 3];
	//  move 将会把 v 移动进闭包的环境中，主线程中不能再使用 v 了
    let handle = thread::spawn(move || {
        println!("Here's a vector: {:?}", v);
    });

    handle.join().unwrap();
}
```

## 消息传递-处理并发的方式

确保安全并发的方式--消息传递

不要通过共享内存来通讯；而是通过通讯来共享内存

### 创建信道

信道：数据从一个线程发送到另一线程

信道关闭：当发送者或接收者任一被丢弃时可以认为信道被关闭了

mpsc：多个生产者，单个消费者的缩小。Rust 标准库实现信道的方式意味着一个信道可以有多个产生值的发送端，但只能有一个消费这些值的接收端

mpsc::channel 函数返回一个元组：第一个元素是发送端 -- 发送者，而第二个元素是接收端 -- 接收者

```
use std::sync::mpsc;
use std::thread;

fn main() {
    // tx 发送，rx 接收
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap(); // send 方法返回一个 Result<T, E> 类型
        // send 获取其参数的所有权并移动这个值归接收者所有，所以这里不能再使用 val 了
    });
    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}
```

recv：receive 的缩写

- 这个方法会阻塞主线程执行直到从信道中接收一个值
- 一旦发送了一个值，recv 会在一个 Result<T, E> 中返回它
- 当信道发送端关闭，recv 会返回一个错误表明不会再有新的值到来了

接收端的另一个方法 try_recv：

- try_recv 不会阻塞，会立刻返回一个 Result<T, E>：Ok 值包含可用的信息，而 Err 值代表此时没有任何消息
- 可以在等待消息的时候处理一些其他的事儿，可以在等待时候循环来频繁调用 try_recv

### 发送多个消息

```
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();
	
    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            // 每发送一次就歇一秒
            thread::sleep(Duration::from_secs(1));
        }
    });
	// 不再显式调用 recv 函数：而是将 rx 当作一个迭代器
	// 当信道被关闭时，迭代器也将结束
    for received in rx {
        println!("Got: {}", received);
    }
}
```

打印如下，每一行都会暂停一秒

```
Got: hi
Got: from
Got: the
Got: thread
```

### 克隆发送者来创建多个生产者

```
let (tx, rx) = mpsc::channel();
// 克隆一个发送者来使用
let tx1 = tx.clone();
// ...创建线程使用克隆出来的 tx1 发送消息
thread::spawn(move || {
    let vals = vec![
        String::from("hi"),
        String::from("from"),
        String::from("the"),
        String::from("thread"),
    ];

    for val in vals {
        tx1.send(val).unwrap();
        thread::sleep(Duration::from_secs(1));
    }
});
// ...创建线程使用 tx 发送消息
```

## 共享状态并发-处理并发的方式

信道类似于单所有权：一旦将一个值传送到信道中，将无法再使用这个值

共享内存类似于多所有权（使用智能指针 `Rc<T>` 来创建引用计数的值，可以拥有多所有者）：多个线程可以同时访问相同的内存位置

### 互斥器（mutex）

> mutual exclusion 的缩写

任意时刻，只允许一个线程访问某些数据

通过锁系统保护其数据:

- 在使用数据之前尝试获取锁
- 处理完被互斥器所保护的数据之后，必须解锁数据，这样其他线程才能够获取锁

#### 单线程使用互斥锁

```
use std::sync::Mutex;

fn main() {
    let m = Mutex::new(5);

    {
        let mut num = m.lock().unwrap();
        // 使用 lock 方法获取锁，以访问互斥器中的数据。这个调用会阻塞当前线程，直到我们拥有锁为止
        // .unwrap()：如果另一个线程拥有锁但是那个线程 panic 了，也让这里使线程 panic
        *num = 6;
    }

    println!("m = {:?}", m); // m = Mutex { data: 6, poisoned: false, .. }
}
```

- Mutex<T> 是一个智能指针
- lock 调用返回 一个叫做 MutexGuard 的智能指针，其实现了 Deref 来指向其内部数据，也提供了一个 Drop 实现当 MutexGuard 离开作用域时自动释放锁

#### 在线程间共享 Mutex<T>

启动十个线程，并在各个线程中对同一个计数器值加一

下面会报错，不能将 counter 锁的所有权移动到多个线程中

```
use std::sync::Mutex;
use std::thread;

fn main() {
    let counter = Mutex::new(0);
    let mut handles = vec![];

    for _ in 0..10 {
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();

            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
```

##### 使用 Rc<T> 拥有多所有者

> `Rc<Mutex<i32>>` cannot be sent between threads safely
>
>  Rc<T> 只适用于单线程场景

`Rc<T>` 并不能安全的在线程间共享。当 `Rc<T>` 管理引用计数时，它必须在每一个 `clone` 调用时增加计数，并在每一个克隆被丢弃时减少计数。`Rc<T>` 并没有使用任何并发原语，来确保改变计数的操作不会被其他线程打断。在计数出错时可能会导致诡异的 bug，比如可能会造成内存泄漏，或在使用结束之前就丢弃一个值。

```
use std::rc::Rc;
use std::sync::Mutex;
use std::thread;

fn main() {
    let counter = Rc::new(Mutex::new(0)); // 原：let counter = Mutex::new(0);
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Rc::clone(&counter); // 复制一个 counter
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();

            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
```

##### 原子引用计数 Arc<T>

> “a” 代表 原子性（atomic）

可以安全的在线程间共享

线程安全带有性能惩罚，只在必要时才为此买单（只是在单线程中对值进行操作，原子性提供的保证并无必要，代码可以因此运行的更快）

Arc<T> 和 Rc<T> 有着相同的 API

```
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();

            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap()); // Result: 10
}
```

- counter 是不可变的，不过可以获取其内部值的可变引用，所以 Mutex<T> 提供了内部可变性
- 使用 RefCell<T> 可以改变 Rc<T> 中的内容，同样，可以使用 Mutex<T> 来改变 Arc<T> 中的内容
- 两个 Rc<T> 值相互引用，引用循环，会造成内存泄漏
- Mutex<T> 也有造成死锁的风险，这发生于当一个操作需要锁住两个资源而两个线程各持一个锁，这会造成它们永远相互等待

## Sync 和 Send trait - 内嵌于语言中并发概念

通常并不需要手动实现 Send 和 Sync trait，因为由 Send 和 Sync 的类型组成的类型，自动就是 Send 和 Sync 的。因为它们是标记 trait，甚至都不需要实现任何方法。它们只是用来加强并发相关的不可变性的。

手动实现 Send 和 Sync 是不安全的

### Send

实现了 Send 的类型值的所有权可以在线程间传送 - 在线程间转移所有权

- 几乎所有的 Rust 类型都是Send 的，但有例外，如 Rc<T>，多线程可能同时更新引用计数
- 任何完全由 Send 的类型组成的类型也会自动被标记为 Send
- 几乎所有基本类型都是 Send 的，除了裸指针

### Sync

实现了 Sync 的类型可以安全的在多个线程中拥有其值的引用

任意类型 T，如果 &T（T 的不可变引用）是 Send 的话 T 就是 Sync 的，这意味着其引用就可以安全的发送到另一个线程

基本类型是 Sync 的，完全由 Sync 的类型组成的类型也是 Sync 的

- 智能指针 Rc<T> 不是 Sync 的
- RefCell<T>（在运行时所进行的借用检查不是线程安全的）和 Cell<T> 系列类型不是 Sync 的
- Mutex<T> 是 Sync  的



# 面向对象编程

面向对象的程序是由对象组成的。一个对象包含数据和操作这些数据的过程。这些过程通常被称为方法或操作。

Rust 是面向对象的：结构体和枚举包含数据而 impl 块提供了在结构体和枚举之上的方法。虽然带有方法的结构体和枚举并不被称为对象，但是它们提供了与对象相同的功能。

封装：可以使用 pub 关键字来决定模块、类型、函数和方法是公有的，而默认情况下其他一切都是私有的

继承：一个对象可以定义为继承另一个对象定义中的元素，这使其可以获得父对象的数据和行为，而无需重新定义。rust 中宏中才可以定义一个结构体继承父结构体的成员和方法

- 重用代码，可使用默认 trait 方法实现来进行有限的共享

多态：子类型可以用于父类型被使用的地方

> Rust 通过泛型来对不同的可能类型进行抽象，并通过 trait bounds 对这些类型所必须提供的内容施加约束

## 结构体-封装

定义一个结构体，结构体中内有两个字段，存储一个列表以及其平均值。结构体公有，其字段私有；定义公有方法，操作其私有字段

```
pub struct AveragedCollection {
    list: Vec<i32>,
    average: f64,
}
impl AveragedCollection {
    pub fn add(&mut self, value: i32) {
        self.list.push(value);
        self.update_average();
    }

    pub fn remove(&mut self) -> Option<i32> {
        let result = self.list.pop();
        match result {
            Some(value) => {
                self.update_average();
                Some(value)
            }
            None => None,
        }
    }

    pub fn average(&self) -> f64 {
        self.average
    }

    fn update_average(&mut self) {
        let total: i32 = self.list.iter().sum();
        self.average = total as f64 / self.list.len() as f64;
    }
}
```

## trait 对象-多态

- 对象、结构体、trait 对象
  - 对象：将数据和行为组合起来
  - 结构体字段中的数据和 impl 块中的行为是分开的
  - trait 对象将数据和行为两者相结合，不同于传统的对象，因为不能向 trait 对象增加数据

- Component 类
  - 该类上有一个 draw 方法
  - 其他的类比如 Button、Image 和 SelectBox 从 Component 派生并因此继承 draw 方法，各自都可以覆盖 draw 方法来定义自己的行为



```
// 定义一个带有 draw 方法的 trait Draw
pub trait Draw {
    fn draw(&self);
}
// 一个存放了名叫 components 的 vector 的结构体 Screen
pub struct Screen {
	// Box<dyn Draw> 为一个 trait 对象，它是 Box 中任何实现了 Draw trait 的类型的替身
    pub components: Vec<Box<dyn Draw>>,
}
// Screen 结构体上定义一个 run 方法，该方法会对其 components 上的每一个组件调用 draw 方法
impl Screen {
    pub fn run(&self) {
        for component in self.components.iter() { // components 中可以是多种类型 Button 或 TextField
            component.draw();
        }
    }
}
// 实现 button 类型 Draw trait
pub struct Button {
    pub width: u32,
    pub height: u32,
    pub label: String,
}

impl Draw for Button {
    fn draw(&self) {
        // code to actually draw a button
    }
}
// 实现 SelectBox 类型 Draw trait
use gui::Draw;

struct SelectBox {
    width: u32,
    height: u32,
    options: Vec<String>,
}

impl Draw for SelectBox {
    fn draw(&self) {
        // code to actually draw a select box
    }
}
// 使用
use gui::{Button, Screen};

fn main() {
    let screen = Screen {
        components: vec![
        	// 这里的元素需要是实现了 trait 对象的 trait 的类型。Box::new(String::from("Hi")) 不行会报错
            Box::new(SelectBox {
                width: 75,
                height: 10,
                options: vec![
                    String::from("Yes"),
                    String::from("Maybe"),
                    String::from("No"),
                ],
            }),
            Box::new(Button {
                width: 50,
                height: 10,
                label: String::from("OK"),
            }),
        ],
    };

    screen.run();
}
```

泛型类型参数一次只能替代一个具体类型 -- 执行静态分发

trait 对象则允许在运行时替代多种具体类型 -- 执行动态分发，使用 trait 对象中的指针来知晓需要调用哪个方法

```
// Screen 结构体的替代实现，其 run 方法使用泛型和 trait bound
pub struct Screen<T: Draw> {
    pub components: Vec<T>,
}

impl<T> Screen<T>
where
    T: Draw,
{
    pub fn run(&self) {
        for component in self.components.iter() { // components 中只能有一种类型，比如全是 Button
            component.draw();
        }
    }
}
```

## 面向对象设计模式的实现？

状态模式

- 是一个面向对象设计模式
- 该模式的关键在于定义一系列值的内含状态
- 这些状态体现为一系列的状态对象，同时值的行为随着其内部状态而改变

以博客为例：

1. 博文从空白的草案开始。
2. 一旦草案完成，请求审核博文。
3. 一旦博文过审，它将被发表。
4. 只有被发表的博文的内容会被打印，这样就不会意外打印出没有被审核的博文的文本。

# 模式

模式：Rust 中特殊的语法，它用来匹配类型中的结构

模式由如下一些内容组合而成：

- 字面值
- 解构的数组、枚举、结构体或者元组
- 变量
- 通配符
- 占位符

结合使用模式和 match 表达式以及其他结构可以提供更多对程序控制流的支配权

## 所有可能会用到模式的位置

### match 分支

[match](#match) 

```
match VALUE {
	// 匹配的值 => 匹配时执行的表达式
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
}
```

模式为每个箭头左边的 PATTERN

### if let条件表达式

[if let](#if let)  

### while let 条件循环

```
   let mut stack = Vec::new();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    while let Some(top) = stack.pop() {
        println!("{}", top);
    }
```

### for 循环

```
  let v = vec!['a', 'b', 'c'];

    for (index, value) in v.iter().enumerate() {
        println!("{} is at index {}", value, index);
    }
```

### let 语句

```
// let PATTERN = EXPRESSION;
let x = 5;
let (x, y, z) = (1, 2, 3);// 使用模式解构元组并一次创建三个变量
```

### 函数参数

x 部分是一个模式

```
fn foo(x: i32) {
    // code goes here
}

// 在参数中解构元组
fn print_coordinates(&(x, y): &(i32, i32)) {
    println!("Current location: ({}, {})", x, y);
}

fn main() {
    let point = (3, 5); //  x 得到了值 3，而 y 得到了值 5
    print_coordinates(&point);
}
```

## 模式有两种形式：refutable（可反驳的）和 irrefutable（不可反驳的）

- 能匹配任何传递的可能值的模式被称为是 不可反驳的
  - let x = 5; x 可以匹配任何值所以不可能会失败
    - 不可反驳模式的地方使用可反驳模式，不能编译：let Some(x) = some_option_value;  如果 some_option_value 的值是 None，其不会成功匹配模式 Some(x)，表明这个模式是可反驳的
  - 函数参数、let 语句和 for 循环只能接受不可反驳的模式。因为当值不匹配时，程序无法进行有意义的操作
- 对某些可能的值进行匹配会失败的模式被称为是 可反驳的
  - if let Some(x) = a_value 表达式中的 Some(x)；如果变量 a_value 中的值是 None 而不是 Some，那么 Some(x) 模式不能匹配
  - if let 和 while let 表达式可以接受可反驳和不可反驳的模式，但编译器会对不可反驳的模式发出警告
  - 把不可反驳模式用到 if let 上，不能编译： if let x = 5 {        println!("{}", x);    };

## 模式语法

### 匹配字面值

```
  let x = 1;

    match x {
        1 => println!("one"),
        2 => println!("two"),
        3 => println!("three"),
        _ => println!("anything"),
    }
```

### 匹配命名变量

```
    let x = Some(5);
    let y = 10;

    match x {
        Some(50) => println!("Got 50"),
        Some(y) => println!("Matched, y = {y}"), // 引入新变量 y，绑定会匹配任何 Some 中的值，在这里是 x 中的值，所以 y = 5
        _ => println!("Default case, x = {:?}", x),
    }

    println!("at the end: x = {:?}, y = {y}", x); // match 作用域已结束。x = Some(5), y = 10
```

### 多个模式

|：或

```
 let x = 1;

    match x {
        1 | 2 => println!("one or two"),// 匹配上了该模式
        3 => println!("three"),
        _ => println!("anything"),
    }
```

### 通过 ..= 匹配值的范围

```
 let x = 5;

    match x {
        1..=5 => println!("one through five"),// 匹配上了该模式
        _ => println!("something else"),
    }
```

字符

```
    let x = 'c';

    match x {
        'a'..='j' => println!("early ASCII letter"),
        'k'..='z' => println!("late ASCII letter"),
        _ => println!("something else"),
    }
```

### 解构并分解值

#### 解构结构体

```
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };

    let Point { x: a, y: b } = p; // 创建了变量 a 和 b 来匹配结构体 p 中的 x 和 y 字段，相当于重命名了。也可以不重命名
    assert_eq!(0, a);
    assert_eq!(7, b);
}
```

将 Point 值分成了三种情况：直接位于 x 轴上（此时 y = 0 为真）、位于 y 轴上（x = 0）或不在任何轴上的点

```
    let p = Point { x: 0, y: 7 };

    match p {
        Point { x, y: 0 } => println!("On the x axis at {x}"),
        Point { x: 0, y } => println!("On the y axis at {y}"),
        Point { x, y } => {
            println!("On neither axis: ({x}, {y})");
        }
    }
```

#### 解构枚举

```
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let msg = Message::ChangeColor(0, 160, 255);

    match msg {
        Message::Quit => {
            println!("The Quit variant has no data to destructure.");
        }
        Message::Move { x, y } => {
            println!("Move in the x direction {x} and in the y direction {y}");
        }
        Message::Write(text) => {
            println!("Text message: {text}");
        }
        Message::ChangeColor(r, g, b) => {
            println!("Change the color to red {r}, green {g}, and blue {b}",)
        }
    }
}
```

#### 解构嵌套的结构体和枚举

```
enum Color {
    Rgb(i32, i32, i32),
    Hsv(i32, i32, i32),
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(Color),
}

fn main() {
    let msg = Message::ChangeColor(Color::Hsv(0, 160, 255));

    match msg {
        Message::ChangeColor(Color::Rgb(r, g, b)) => {
            println!("Change color to red {r}, green {g}, and blue {b}");
        }
        Message::ChangeColor(Color::Hsv(h, s, v)) => {
            println!("Change color to hue {h}, saturation {s}, value {v}")
        }
        _ => (),
    }
}
```

#### 解构结构体和元组

```
   let ((feet, inches), Point { x, y }) = ((3, 10), Point { x: 3, y: -10 });
```

### 忽略模式中的值

#### 使用 _ 忽略整个值

（match 中使用类似 js 中switch 中的 default）

##### 在函数签名中使用 _

忽略作为第一个参数传递的值 3，并会打印出 This code only uses the y parameter: 4

```
fn foo(_: i32, y: i32) {
    println!("This code only uses the y parameter: {}", y);
}

fn main() {
    foo(3, 4);
}
```

##### 使用嵌套的 _ 忽略部分值

当不需要 Some 中的值时在模式内使用下划线来匹配 Some 成员

```
    let mut setting_value = Some(5);
    let new_setting_value = Some(10);

    match (setting_value, new_setting_value) {
        (Some(_), Some(_)) => { // 匹配上了
            println!("Can't overwrite an existing customized value");
        }
        _ => {
            setting_value = new_setting_value;
        }
    }

    println!("setting is {:?}", setting_value);
    // Can't overwrite an existing customized value
    // setting is Some(5)
```

也可以在一个模式中的多处使用下划线来忽略特定值

```
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        (first, _, third, _, fifth) => {
            println!("Some numbers: {first}, {third}, {fifth}")
        }
    }
```

##### _名忽略未使用的变量

```
fn main() {
    let _x = 5; // 告诉 Rust 不要警告未使用的变量
    let y = 10; // 警告说未使用变量 y
}
```

_x 仍会将值绑定到变量，而 _ 则完全不会绑定

_x 会绑定值，它可能会获取值的所有权

```
    let s = Some(String::from("Hello!"));

    if let Some(_s) = s { // 如果这里是 _ 就不会编译报错了
        println!("found a string");
    }

    println!("{:?}", s); // 产生一个错误，因为所有权给 _s 了
```

#### 用 .. 忽略剩余值

.. 模式会忽略模式中剩余的任何没有显式匹配的值部分

结构体：

```
    struct Point {
        x: i32,
        y: i32,
        z: i32,
    }

    let origin = Point { x: 0, y: 0, z: 0 };

    match origin {
        Point { x, .. } => println!("x is {}", x), // .. 比列出 y: _ 和 z: _ 要来得简单
    }
```

元组

```
fn main() {
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        (first, .., last) => {
            println!("Some numbers: {first}, {last}");
        }
    }
}
```

使用 .. 必须是无歧义的。如果期望匹配和忽略的值是不明确的，Rust 会报错

```
(.., second, ..) => {
            println!("Some numbers: {}", second)
},
```

### 匹配守卫提供的额外条件

匹配守卫是一个指定于 match 分支模式之后的额外 if 条件，它也必须被满足才能选择此分支

编译器不会尝试为包含匹配守卫的模式检查穷尽性

#### 匹配守卫

```
 let num = Some(4);

    match num {
        Some(x) if x % 2 == 0 => println!("The number {} is even", x),
        Some(x) => println!("The number {} is odd", x),
        None => (),
    }
```

#### 结合多个模式与匹配守卫

```
    let x = 4;
    let y = false;

    match x {
        4 | 5 | 6 if y => println!("yes"), // 左侧模式等价于 (4 | 5 | 6) if y
        _ => println!("no"),
    }
```

### @ 绑定

at 运算符（@）允许在创建一个存放值的变量的同时测试其值是否匹配模式

```
enum Message {
        Hello { id: i32 },
    }

    let msg = Message::Hello { id: 5 };

    match msg {
        Message::Hello {
            id: id_variable @ 3..=7, // id_variable @，捕获了任何匹配此范围的值并同时测试其值匹配这个范围模式
        } => println!("Found an id in range: {}", id_variable), // Found an id in range: 5
        Message::Hello { id: 10..=12 } => {
            println!("Found an id in another range")
        }
        Message::Hello { id } => println!("Found some other id: {}", id), // 指定了一个没有范围的变量
    }
```

# 高级特征

## 不安全 Rust

通过 unsafe 关键字来切换到不安全 Rust

- 只提供了那五个不会被编译器检查内存安全的功能，要求这五类操作必须位于标记为 unsafe 的块中（意味着内存相关的错误一定在 unsafe 内）
- 不意味着块中的代码就一定是危险的或者必然导致内存安全问题
- 建议 unsafe 块尽可能小
- 建议将不安全代码封装进一个安全的抽象并提供安全 API -- 尽可能隔离不安全代码

不安全的超能力：

- 解引用裸指针
- 调用不安全的函数或方法
- 访问或修改可变静态变量
- 实现不安全 trait
- 访问 `union` 的字段

### 解引用裸指针

- 不安全 Rust 有两个被称为裸指针（raw pointers）的类似于引用的新类型
  - 星号不是解引用运算符，它是类型名称的一部分
  - 不可变：`*const T`，指针解引用之后不能直接赋值*
  - 可变的：`*mut T`
- 裸指针与引用和智能指针的区别？

可以在安全代码中创建裸指针--创建一个指针不会造成任何危险

不能在不安全块之外解引用裸指针--只有当访问其指向的值时才有可能遇到无效的值

```
    let mut num = 5;

    let r1 = &num as *const i32;
    let r2 = &mut num as *mut i32;

    unsafe {
        println!("r1 is: {}", *r1);
        println!("r2 is: {}", *r2);
    }
```

- 可同时指向相同内存位置 num 的裸指针，若通过可变指针修改数据，则可能潜在造成数据竞争（不能同时创建 num 的不可变和可变引用）

### 调用不安全的函数或方法

不安全函数和方法：开头有一个额外的 unsafe

定义与调用都需要 unsafe 关键词

```
    unsafe fn dangerous() {}

    unsafe {
        dangerous();
    }
```

使用 extern 函数调用外部代码：集成 C 标准库中的 abs 函数

```
extern "C" { // extern 块中声明的函数在 Rust 代码中总是不安全的
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
```

C 语言调用 Rust 函数：extern 的使用无需 unsafe

```
#[no_mangle]
pub extern "C" fn call_from_c() {
    println!("Just called a Rust function from C!");
}
```

### 访问或修改可变静态变量

全局变量在 Rust 中被称为静态变量，静态变量中的值有一个固定的内存地址

静态变量只能储存拥有 'static 生命周期的引用

访问不可变静态变量是安全的

访问和修改可变静态变量都是不安全的

```
static mut COUNTER: u32 = 0;

fn add_to_count(inc: u32) {
    unsafe {
        COUNTER += inc;
    }
}

fn main() {
    add_to_count(3);

    unsafe {
        println!("COUNTER: {}", COUNTER);
    }
}
```

### 实现不安全 trait

当 trait 中至少有一个方法中包含编译器无法验证的不变式时 trait 是不安全的  将 trait 声明为 unsafe

```
// trait 之前增加 unsafe 关键字
unsafe trait Foo {
    // methods go here
}
// trait 的实现也必须标记为 unsafe
unsafe impl Foo for i32 {
    // method implementations go here
}

fn main() {}
```

### 访问联合体中的字段

联合体主要用于和 C 代码中的联合体交互

## 高级类型

### 类型别名用来创建类型同义词

创建 i32 的别名 Kilometers，Kilometers 是 i32 的同义词

```
type Kilometers = i32;
```

类型别名的主要用途是减少重复，短的别名代替名称很长的类型

### 从不返回的 never type

特殊类型 ! 没有值

在函数从不返回的时候充当返回值；从不返回的函数被称为发散函数

```
fn bar() -> ! {
    // --snip--
}
```

 never type 可以强转为任何其他类型

```
// match 的分支必须返回相同的类型
let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue, // continue 的值是 !,因为 ! 并没有一个值，Rust 决定 guess 的类型是 u32
        };
```

panic! 是 ! 类型

```
impl<T> Option<T> {
    pub fn unwrap(self) -> T {
        match self {
            Some(val) => val, // val 是 T 类型
            None => panic!("called `Option::unwrap()` on a `None` value"), // panic! 是 ! 类型
        }
    }
}
```

loop 表达式 是 ！

```
print!("forever ");

loop { // 循环永远也不结束，所以此表达式的值是 !
    print!("and ever ");
}
```

### 动态大小类型和 Sized trait

动态大小类型：“DST” 或 “unsized types”，只有在运行时才知道大小的类型

- str 本身，不是 &str

- 为了处理 DST，Rust 提供了 Sized trait 来决定一个类型的大小是否在编译时可知

- Rust 隐式的为每一个泛型函数增加了 Sized bound

  ```
  fn generic<T>(t: T) {
      // --snip--
  }
  当做如下处理
  fn generic<T: Sized>(t: T) {
      // --snip--
  }
  ```

- 泛型函数默认只能用于在编译时已知大小的类型。然而可以使用如下特殊语法来放宽这个限制

  ```
  fn generic<T: ?Sized>(t: &T) { // T 可能是也可能不是 Sized
      // --snip--
  }
  ```

## 高级函数与闭包

函数满足类型 fn（小写的 f），fn 被称为函数指针，通过函数指针允许我们使用函数作为另一个函数的参数

```
fn add_one(x: i32) -> i32 {
    x + 1
}

fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 {
    f(arg) + f(arg)
}

fn main() {
    let answer = do_twice(add_one, 5);

    println!("The answer is: {}", answer); // 12
}
```

- fn 是一个类型而不是一个 trait
- 函数指针实现了所有三个闭包 trait（Fn、FnMut 和 FnOnce）

## 宏

使用工作空间创建了demo

- 创建 macro_demo 根目录与根目录的 .toml
- cargo new i_entry 创建项目，方便些 main 去引入库使用测试，运行 cargo new -p i_entry
-  cargo new --lib m_rules 创建声明宏库
-  cargo new --lib m_proc 创建过程宏库???

### 宏和函数的区别

- 宏是一种为写其他代码而写代码的方式，即所谓的元编程。元编程对于减少大量编写和维护的代码是非常有用的，它也扮演了函数扮演的角色。但宏有一些函数所没有的附加能力
- 一个函数签名必须声明函数参数个数和类型；宏能够接收不同数量的参数
- 宏可以在编译器翻译代码前展开，例如，宏可以在一个给定类型上实现 trait。而函数则不行，因为函数是在运行时被调用，同时 trait 需要在编译时实现
- 宏定义要比函数定义更复杂，宏定义通常要比函数定义更难阅读、理解以及维护
- 在一个文件里调用宏之前必须定义它，或将其引入作用域，而函数则可以在任何地方定义和调用

### 声明宏 macro_rules!

最常用的宏形式是声明宏，声明宏允许编写一些类似 Rust match 表达式的代码

逻辑：匹配对应模式然后以另一部分代码替换当前代码

#### vec! 宏定义的简化版本

```
let v: Vec<u32> = vec![1, 2, 3];
```

vec! 宏可以接收 3 个整数，也可以是 2 个整数或者 5 个字符串 slice 来构造 vector，但无法使用函数做相同的事，因为无法预先知道参数值的数量和类型

```
#[macro_export]
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}
```

- #[macro_export] 注解表明只要导入了定义这个宏的 crate，该宏就应该是可用的。如果没有该注解，这个宏不能被引入作用域
- 使用 macro_rules! 和宏名称开始宏定义，且所定义的宏并不带感叹号；宏名称后面的大括号表示宏定义体
- vec! 宏的结构和 match 表达式的结构类似，是一个分支模式。这里这个宏只有一个模式，那就只有一个有效匹配方向，其他任何不匹配这个模式都会导致错误。更复杂的宏会有多个分支模式
- ( $( $x:expr ),* )
  - 美元符号明确表明这是一个宏变量而不是普通 Rust 变量
  - ( $x:expr ) 任何匹配了该模式的表达式命名为 $x，方便下面使用；$x:expr 匹配 Rust 的任意表达式
  - $() 之后的逗号说明一个可有可无的逗号分隔符可以出现在 $() 所匹配的代码之后
  - \* 说明该模式匹配零个或更多个 \* 之前的任何模式
- $()* 里生成temp_vec.push($x)，生成零次还是多次取决于模式匹配到多少次

vec![1, 2, 3]; 调用宏时，$x 模式与三个表达式 1、2 和 3 进行了三次匹配，调用该宏时，替换该宏调用所生成的代码会是下面这样

```
{
    let mut temp_vec = Vec::new();
    temp_vec.push(1);
    temp_vec.push(2);
    temp_vec.push(3);
    temp_vec
}
```

### 过程宏

逻辑：接收 Rust 代码作为输入，在这些代码上进行操作，然后产生另一些代码作为输出

有三种类型的过程宏（自定义派生（derive），类属性和类函数）

#### 自定义 derive 宏

??

# web server

涉及到的两个主要协议：

- 超文本传输协议（Hypertext Transfer Protocol，HTTP）
- 传输控制协议（Transmission Control Protocol，TCP）

这两者都是 请求 - 响应（request-response）协议

- 有客户端（client）初始化请求
- 服务端（server）监听请求并向客户端提供响应
- 请求与响应的内容由协议本身定义





# 字典查阅

## 函数

- `pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {vec![]}`
  - `'a`： 生命周期 'a
  - &str
  - &'a str
  - 返回值的生命周期与参数 `contents` 的生命周期一样久
- &(*m)[..]

## 遍历

- `for line in contents.lines() { }`：contents 是 &str 类型，lines 返回迭代器

## 类型

### 字符串

- `str.contains(str1)`字符串 str 中是否包含 str1

- `str.to_lowercase()`字符串 str 转为全小写

- ```js
  // 双引号之后的反斜杠，这告诉 Rust 不要在字符串字面值内容的开头加入换行符
  let contents = "\
  Rust:xxx";
  ```

- `str.lines()`返回迭代器

### Vec 存储列表

> vector 只能存储同种类型元素
>
> 定义 SpreadsheetCell 枚举来储存整型，浮点型和文本成员的替代方案

let mut results = Vec::new();

- `results.push(str1)` 将字符串加入列表
- `for item in results {}` 遍历
- `v1.iter().map(|x| x + 1).collect()`  得到一个每个元素都 +1 的 vec 列表
- `v1.into_iter().filter(|s| s > 3).collect()`过滤某些元素得到新的 vec 列表

## 环境变量

- ```
  use std::env;
  // 是否忽略大小写
  let ignore_case = env::var("IGNORE_CASE").is_ok();
  
  // 执行命令时设置环境变量
  IGNORE_CASE=1 cargo run to poem.txt
  // PowerShell 中如下，这样环境变量会在 shell 会话中持续生效
  $Env:IGNORE_CASE=1; cargo run to poem.txt
  // 取消设置环境变量
  Remove-Item Env:IGNORE_CASE
  ```

## Result

- `r.is_ok()`该值是否被设置
- r.unwrap_or_else

## 打印

- `println!("str")`打印信息
- `println!("xxx: {e}");` 打印字符串类型变量
- `println!("xxx is {:?}", rect1);` 需要在文件顶部写 #[derive(Debug)]，这样可以打印不明确的结构的变量
- `eprintln!("str")` 打印错误信息
- `cargo run > output.txt` 打印信息到某个文件而不是终端

