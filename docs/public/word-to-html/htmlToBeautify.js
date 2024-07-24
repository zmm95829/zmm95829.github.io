
const options = {
  indent_size: 2,         // 缩进的空格数
  indent_char: ' ',       // 缩进使用的字符
  indent_with_tabs: false,// 是否使用tab进行缩进
  eol: '\n',              // 换行符
  end_with_newline: true, // 代码结尾是否加一个新行
  preserve_newlines: true,// 是否保留现有的换行
  max_preserve_newlines: 10, // 最大保留换行数
  indent_inner_html: true,  // 缩进<script>和<style>标签内的代码
  brace_style: 'collapse',  // 大括号风格
  indent_scripts: 'keep',   // 缩进<script>标签的代码
  wrap_line_length: 0,      // 超过多少字符自动换行
  wrap_attributes: 'auto',  // 属性换行方式
  wrap_attributes_indent_size: 4, // 属性换行缩进
  unformatted: [],          // 不需要格式化的标签（默认是 inline 标签）
  content_unformatted: [],  // 不需要格式化的内容
  extra_liners: []          // 需要额外加换行符的标签
};

const afterImgClassIsName = false; 
/**
 * 判断是否不以标点结尾并且是30字以内，true 则加 list-style 样式
 * @param {*} str 
 * @returns 
 */
function isPunctuationAtEndAndWithinLength(str) {
  // 定义正则表达式，匹配以标点符号结尾的字符串
  const punctuationRegex = /[。！？,.!?，：:;；]$/;
  // 判断长度是否在30个字符以内
  const isWithinLength = str.length <= 30;
  // 判断是否以标点符号结尾
  const isPunctuationAtEnd = punctuationRegex.test(str);
  return isWithinLength && !isPunctuationAtEnd;
}

function htmlToBeautify(bodyContent, html_beautify, docName) {
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    :root {
      --width: 900px;
    }

    img {
      max-width: var(--width);
    }

    .img-name {
      text-align: center;
      margin-top: -10px;
      color: #8f8d8d;
    }
    
    .list-style {
      position: relative;
    }

    /* 圆点标题 */
    .list-style::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      background-color: black;
      border-radius: 50%;
    }

    p {
      text-indent: 2em;
    }
    
    /* 选择仅包含 img 的 p 标签 */
    p.has-only-img:has(> img:only-child) {
      text-align: center;
      text-indent: unset;
    }

    /* p 中有图片和文字内容 */
    p:not(.has-only-img):has(> img:only-child) {
      display: flex;
      flex-direction: column;
    }

    p:not(.has-only-img):has(> img:only-child) img {
      align-self: center;
      margin-bottom: 16px;
    }
    
    table {
      width: 70%;
      margin: 0 auto;
      text-align: center;
      border-collapse: collapse;
    }

    table,
    th,
    td {
      border: 1px solid black;
    }
    table p {
      text-indent: unset;
      margin: 0;
    }

    tbody tr:first-child td, th {
      background-color: #f2f2f2;
      padding: 10px;
    }

    td {
      padding: 10px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      display: block;
      margin: 20px 0;
    }

    h1::before,
    h2::before,
    h3::before,
    h4::before,
    h5::before,
    h6::before {
      margin-right: 10px;
    }

    h1 {
      font-size: 20px;
      font-weight: 600;
    }

    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 18px;
      ;
    }

    h4 {
      font-size: 16px;
    }

    h5 {
      font-size: 14px;
    }

    h6 {
      font-size: 12px;
    }

    /* 初始化全局计数器 */
    body {
      counter-reset: h1;
      width: var(--width);
      padding-left: calc((100% - var(--width)) / 2);
      padding-right: calc((100% - var(--width)) / 2);
      margin: 0;
    }

    /* 设置h1计数器，字体大小 */
    h1 {
      counter-reset: h2;
    }

    h2 {
      counter-reset: h3;
    }

    h3 {
      counter-reset: h4;
    }

    h4 {
      counter-reset: h5;
    }

    h5 {
      counter-reset: h6;
    }

    /* 为每个h标签增加编号 */
    h1::before {
      counter-increment: h1;
      content: counter(h1);
    }

    h2::before {
      counter-increment: h2;
      content: counter(h1) "." counter(h2);
    }

    h3::before {
      counter-increment: h3;
      content: counter(h1) "." counter(h2) "." counter(h3);
    }

    h4::before {
      counter-increment: h4;
      content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4);
    }

    h5::before {
      counter-increment: h5;
      content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5);
    }

    h6::before {
      counter-increment: h6;
      content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) "." counter(h6);
    }

    /* 设置有序编号方式为 (1) (2) (3) 等 */
    ol {
      list-style-type: none;
      counter-reset: list-counter;
      padding: 0;
    }

    ol li {
      counter-increment: list-counter;
    }

    ol li::before {
      content: "(" counter(list-counter) ") ";
      margin-right: 8px;
    }
  </style>
</head>
<body>
${`<div style="text-align: center; font-size: 24px; font-weight: bold; margin: 20px">${docName}</div>` }
${bodyContent}
</body>
</html>`;
  return html_beautify(template, options)
  // 自关闭的 a 和 p 删掉
  .replace(/<a[^>]*><\/a>|<p[^>]*><\/p>/g, "")
  // 再来一遍，以免 p 中 a 删掉之后留下空白 p
  .replace(/<a[^>]*><\/a>|<p[^>]*><\/p>/g, "")
  // 把 ol 中的 strong 标签换成 h1
  .replace(/<ol>\s*<li>\s*<strong>(.+?)<\/strong>\s*<\/li>\s*<\/ol>/g, '<h1>$1</h1>')
  // 把 ul 中的 li 标签换成 p
  .replace(/<ul>\s*<li>(.+?)<\/li>\s*<\/ul>/g, '<p>$1</p>')
  // 删掉目录
  .replace(/<p>\s*目\s*录\s*<\/p>[\s\S]*?(?=<h[1-6]>)/g, '')
  // 将图片后面的内容设置类名，如果图片没有名称则按照 list-style 处理
  .replace(/<p><img[^>]*><\/p>\s*?<p>([^<]{1,30})<\/p>/g, function($0, $1) {
    return isPunctuationAtEndAndWithinLength($1) ?  `<p class="${afterImgClassIsName ? "img-name" : "list-style"}">${$1}</p>` : $0;
  })
  .replace(/<p>([^<]{1,30})<\/p>/g, function($0, $1, $2) {
    // 把 h 后符合条件的 p 标签设置为 list-style 样式
    return isPunctuationAtEndAndWithinLength($1) ? `<p class="list-style">${$1}</p>` : $0;
  })
  // 去掉 table 中的样式
  .replace(/<table[\S\s]*?<\/table>/g, ($0, $1) => {
    return $0.replace(/ class="list-style"/g, "");
  })
  .replace(/<p>((?:\s*<img[^>]*>\s*)+)<\/p>/g, function(match, p1) {
    // 如果<p>标签内只有<img>标签，则给<p>标签添加class
    return `<p class="has-only-img">${p1}</p>`;
  });
};
