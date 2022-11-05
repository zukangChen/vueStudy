// 尝试编写一个简单的 Button 组件

import { defineComponent, PropType } from "vue";
import "uno.css";
export type IColor = 'black' | 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink'
export const props = {
  color: {
    type: String as PropType<IColor>,
    default: 'blue'  // 设定默认颜色
  },
  icon: {
    type: String,
    default: 'search'
  },
  round: {
    type: Boolean,
    default: false,
  },

  plain: {
    type: Boolean,
    default: false,
  },
}
export default defineComponent({
  name: "SButton",
  props,  // 注册属性
  setup(props, { slots }) {
    return () => <button
      class={`
          py-2 
          px-4 
          font-semibold 
          rounded-lg 
          shadow-md 
          text-white 
          bg-${props.color}-500 
          hover:bg-${props.color}-700 
          border-none 
          cursor-pointer
          transition duration-300 ease-in-out transform hover:scale-105
          m-1
          `}
    >
      {props.icon !== "" ? <i class={`i-ic-baseline-${props.icon} p-3`}></i> : ""}
      {slots.default ? slots.default() : ''}
    </button>
  }
});