// import demoblock from 'vitepress-demoblock';
export default {
  title: "zmm's notes",
  description: "zmm的笔记",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    nav: [
      { text: 'js', link: '/js/', activeMatch: '/js' },
      {
        text: 'css',
        items: [
          { text: 'css', link: '/' },
          { text: 'preprocessor', link: 'http://www.baidu.com' }
        ]
      },
      { text: '综合案例', link: '/htmlJsCss/', activeMatch: '/htmlJsCss' },
    ],
    sidebar: {
      "/htmlJsCss/": [
        {
          text: '生成目录滚动高亮',
          link: "/htmlJsCss/生成目录滚动高亮"
        }
      ]
    },
    socialLinks: [
      { icon: "github", link: "https://github.com" },
    ],
    docFooter: { prev: '上一篇', next: '下一篇' },
    footer: {
      message: "zmm的笔记",
      copyright: "Copyright @2023-present zmm"
    }
  },
  // markdown: {
  //   config: (md) => {
  //     md.use(demoblock)
  //   }
  // }
}