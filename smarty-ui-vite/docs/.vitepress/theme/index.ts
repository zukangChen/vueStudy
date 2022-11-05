import Theme from 'vitepress/dist/client/theme-default'
import SmartyUI from '../../../src/entry'
import TestGlob from '../components/TestGlob.vue'
// 插件的组件，主要是demo组件
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(SmartyUI)
    app.component('TestGlob', TestGlob)
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
  },
}