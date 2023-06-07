import DefaultTheme from "vitepress/theme";
import demo from "../lib/vitepress-demoblock/demo.vue"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("demo", demo)
    app.use(ElementPlus)
  }
};