import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx"; // 用于vite支持编译jsx
import Unocss from "../config/unocss"; // 引入UnoCSS
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    // 添加JSX插件
    vueJsx(),
    Unocss(),
  ],
});