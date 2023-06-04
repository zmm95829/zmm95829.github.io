import DefaultTheme from "vitepress/theme";
import demo from "../lib/vitepress-demoblock/demo.vue"

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("demo", demo)
  }
};