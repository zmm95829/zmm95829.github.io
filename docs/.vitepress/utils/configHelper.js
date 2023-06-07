import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 获取得到当前文件的父级路径
const dir = path.resolve();

// 放文档的目录以及其导航显示文本
const root = {
  html: "html",
  js: "js",
  css: "css",
  htmlJsCss: "综合案例",
  vue: "vue",
  framework: "框架",
  other: "其他"
};

const keyMap = {
  "css-base": "基础",
  "css-preprocessor": "预处理器"
}

// 判断是否是文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory()
// 该目录是否是被忽略的
const isIgnore = (name) => name === "components" || name.endsWith(".assets");

const removeSuffix = (name) => name.slice(0, name.lastIndexOf("."));

const navValue = [];
const sidebarValue = {};
const rootKeys = Object.keys(root);

function getPages(currentPath, pLink) {
  // 是目录
  const re = [];
  const dirs = fs.readdirSync(currentPath);
  dirs.forEach(item => {
    const itemPath = path.resolve(currentPath, item);
    if (!isIgnore(item)) {
      if (isDirectory(itemPath)) {
        const pushItem = {
          text: keyMap[item] || item,
          items: getPages(itemPath, pLink + item + "/")
        };
        if (pushItem.items.length === 0) {
          pushItem.link = pLink + item + "/";
          delete pushItem.items;
        }
        re.push(pushItem);
      } else {
        const text = removeSuffix(item);

        // 给 nav 设置默认跳转路径
        const key = pLink.match(/\/.+?\//)[0];
        const nevItem = navValue.find(v => v.link === key);
        // 能找到说明还没有重置，需要重置一下
        if (nevItem) {
          nevItem.link = pLink + text;
        }

        // index 的不需要显示在左侧
        text !== "index" && re.push({
          text,
          link: pLink + text
        })
      }
    }
  })
  return re;
}

const rootPath = path.resolve(__dirname, "../..");

function getSidebar() {
  rootKeys.forEach(key => {
    const link = "/" + key + "/";
    navValue.push({
      text: root[key],
      link,
      activeMatch: link
    });
    try {
      sidebarValue[link] = getPages(path.resolve(rootPath, link.slice(1)), link);
    } catch (e) {
      console.log("error in configHelper：", e)
    }
  })
  return [navValue, sidebarValue];
}
export default getSidebar;

// nav: [
//   { text: 'js', link: '/js/', activeMatch: '/js' },
//   {
//     text: 'css',
//     items: [
//       { text: 'css', link: '/css/' },
//       { text: 'preprocessor', link: 'http://www.baidu.com' }
//     ]
//   },
//   { text: '综合案例', link: '/htmlJsCss/', activeMatch: '/htmlJsCss' },
// ],
// sidebar: {
//   "/htmlJsCss/": [
//     {
//       text: '生成目录滚动高亮',
//       link: "/htmlJsCss/生成目录滚动高亮"
//     }
//   ]
// }