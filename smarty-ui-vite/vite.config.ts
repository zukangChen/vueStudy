import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue"; // 用于vite支持编译vue文件
import vueJsx from "@vitejs/plugin-vue-jsx" // 用于vite支持编译jsx


// 引入UnoCSS
import Unocss from "./config/unocss";

// https://vitejs.dev/config/

const rollupOptions = {

  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};
export default defineConfig({

  plugins: [
    vue(),
    // 添加JSX插件
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    // 添加UnoCSS插件
    Unocss()
  ],
  // 默认 Vite 就是可以支持构建，使用 Vite 的 build 命令就可以打包输出。如果导出的是一个库文件的话，还需要配置【导出模块类型】并确定导出的文件名。配置如下
  build: {
    rollupOptions,
    minify: false,
    cssCodeSplit: true,   // 这个选项是为了决定在编译的时候是否要独立输出 css。显然这里面应该选择为 true。
    lib: { // 组件库
      entry: "./src/entry.ts",
      name: "SmartyUI",
      fileName: "smarty-ui",
      // 导出模块格式
      formats: ["esm", "umd", "iife"],
    },
  },
  // 单元测试
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom', // 用于提供测试所需要的 Dom 仿真
    transformMode: { // 支持tsx组件，很关键
      web: [/.[tj]sx$/]
    }
  }

});