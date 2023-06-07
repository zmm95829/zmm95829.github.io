import demoblock from './lib/vitepress-demoblock';
import getSidebar from "./utils/configHelper";
const [nav, sidebar] = getSidebar();
export default {
  title: "zmm's notes",
  description: "zmm的笔记",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  lastUpdated: true,
  themeConfig: {
    logo: '/favicon.ico',
    lastUpdatedText: "最后更新时间",
    outline: {
      level: [2, 6],
      label: '目录'
    },
    nav,
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/zmm95829/zmm95829.github.io/tree/note-pages" },
    ],
    docFooter: { prev: '上一篇', next: '下一篇' },
    footer: {
      message: "zmm的笔记",
      copyright: "Copyright @2023-present zmm"
    }
  },
  markdown: {
    config: (md) => {
      md.use(demoblock)
    }
  }
}