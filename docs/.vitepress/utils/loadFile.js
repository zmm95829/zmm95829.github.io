import { resolve } from "path";
import fs from "fs";
const dir = resolve("../../public");
console.log("__dirname", __dirname, resolve(dir, "./生成目录滚动高亮.html"))

console.log(3333, data)
/**
 * path：相对于 public 的文件路径，如 ./生成目录滚动高亮.html
 */
export function getFileContent(path) {
  return fs.readFileSync(resolve(dir, path), "utf-8", cbFn);
}