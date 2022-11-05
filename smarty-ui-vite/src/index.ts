
// import { createApp } from "vue";
// import SmartyUI from "unocss"
import { createApp } from "vue/dist/vue.esm-browser";
import SmartyUI from './entry'
// import SButton from "./button";
// import SFCButton from "./button/SFCButton.vue";
// import JSXbutton from './button/JSXButton'

// createApp(JSXbutton)
//   .mount("#app");
// createApp(SButton).mount("#app");
createApp({
  template: `
    <div>
      <SButton color="blue" round plain icon="search">蓝色按钮</SButton>
      <SButton color="green" icon="edit">绿色按钮</SButton>
      <SButton color="gray" icon="check">灰色按钮</SButton>
      <SButton color="yellow" icon="message">黄色按钮</SButton>
      <SButton color="red" icon="delete">红色按钮</SButton>
    </div>
  `
})
  .use(SmartyUI)
  .mount("#app");