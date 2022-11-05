// 引入UnoCSS
import { presetUno, presetAttributify, presetIcons } from "unocss";
// import { presetUno, presetAttributify } from "unocss";

import Unocss from "unocss/vite";

const colors = [ // 颜色列表
  "white",
  "black",
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];
const icons = [ // 图标列表
  "search",
  "edit",
  "check",
  "message",
  "star-off",
  "delete",
  "add",
  "share",
]
const safelist = [

  ...colors.map((v) => `bg-${v}-500`),
  ...colors.map((v) => `hover:bg-${v}-700`),
  ...icons.map((v) => `i-ic-baseline-${v}`)
];

export default () =>
  Unocss({
    safelist,
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons() // 图标预设
    ],
  });