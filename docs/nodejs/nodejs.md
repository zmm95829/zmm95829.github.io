获取文件目录

```js
import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url)

```



# fs

## 读取目录



## 读取文件

fs.readFile(path[, options], callback)

fs.readFile("./xx/xxx.txt", "utf8", (err, result) => err 是空的表示成功)



const result = fs.readFileSync("xxx.txt")

## 写入文件

 fs.writeFile(file, data[, options], callback)

fs.writeFile('./xx/xxx.txt', '写入内容', err => err 空的表示成功)

## 获取文件信息

fs.stat(path, callback)

statSync

```js
fs.stat('/xx/xx.js', function (err, stats) {
    // 以下是 state 的属性、方法
    isFile() 是否是文件
    isDirectory() 是否是目录
})
```

## 删除文件

fs.unlink(path, callback)

callback(err)

## 创建目录

fs.mkdir(path[, options], callback)

options: 

- recursive - 是否以递归的方式创建目录，默认为 false
- mode - 设置目录权限，默认为 0777。

## 读取目录

fs.readdir(path, callback)

callback

- err
- files

## 删除目录

只能删除空文件夹 fs.rmdir(path, callback)

```js
function delDir(path) {
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      let files = fs.readdirSync(path);
      files.forEach((file) => {
        let currentPath = path + "/" + file;
        if (fs.statSync(currentPath).isDirectory()) {
          delDir(currentPath);
        } else {
          fs.unlinkSync(currentPath);
        }
      });
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }
}
```



## 复制文件

fs.copyFile('./a.txt', './xx/b.txt');

## 复制目录

```js

// 复制目录
fs.cp('./aa', './bb', { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }

```

