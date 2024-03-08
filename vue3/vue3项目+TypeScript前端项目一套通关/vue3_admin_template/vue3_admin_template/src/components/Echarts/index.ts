import type { App } from 'vue'
import * as echarts1 from 'echarts'
import mapJsonData from './province/china.json'
import chinaBJ from './province/bou1_4p.json'
import world from './province/world.json'
const echarts = {
  version: '1.0.0',
  install(app: App) {
    echarts1.registerMap('china', mapJsonData as any)
    echarts1.registerMap('chinaBJ', chinaBJ as any)
    echarts1.registerMap('world', world as any)
    // 读取echarts文件夹下的.vue文件，然后循环注册成全局组件
    Object.values(
      import.meta.globEager('@/components/echarts/**/*.vue'),
    ).forEach((component: any) => {
      app.component(
        `chart${
          component.default.__name.slice(0, 1).toUpperCase() +
          component.default.__name.slice(1)
        }`,
        component.default,
      )
    })
  },
}
export default echarts
