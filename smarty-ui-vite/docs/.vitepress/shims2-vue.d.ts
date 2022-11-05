
// 一、先说第一个问题.vue 文件引入时，提示 找不到模块“xxx.vue”或其相应的类型声明
// 方式一：在你的src目录下创建一个.d.ts结尾的文件 例如：env.d.ts 里面内容如下:

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}